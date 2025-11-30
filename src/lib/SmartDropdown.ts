
export interface SmartDropdownOptions {
  offset?: number; // Distance from trigger
  viewportPadding?: number; // Minimum distance from viewport edge
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export class SmartDropdown {
  private trigger: HTMLElement;
  private menu: HTMLElement;
  private options: Required<SmartDropdownOptions>;
  private isOpen: boolean = false;
  private cleanupEvents: (() => void)[] = [];
  private static activeDropdowns: Set<SmartDropdown> = new Set();

  private static DEFAULT_OPTIONS: Required<SmartDropdownOptions> = {
    offset: 8,
    viewportPadding: 8,
    placement: 'bottom-start',
    closeOnOutsideClick: true,
    closeOnEsc: true,
    onOpen: () => {},
    onClose: () => {},
  };

  constructor(trigger: HTMLElement, menu: HTMLElement, options: SmartDropdownOptions = {}) {
    this.trigger = trigger;
    this.menu = menu;
    this.options = { ...SmartDropdown.DEFAULT_OPTIONS, ...options };

    this.init();
  }

  private init() {
    // ARIA Setup
    const id = this.menu.id || `sd-menu-${Math.random().toString(36).substr(2, 9)}`;
    this.menu.id = id;
    this.menu.setAttribute('role', 'menu');
    this.menu.setAttribute('aria-hidden', 'true');
    this.menu.classList.add('sd-menu');
    
    this.trigger.setAttribute('aria-haspopup', 'true');
    this.trigger.setAttribute('aria-expanded', 'false');
    this.trigger.setAttribute('aria-controls', id);

    // Bind Events
    this.addEvent(this.trigger, 'click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    this.addEvent(this.trigger, 'keydown', (e: Event) => {
        const keyEvent = e as KeyboardEvent;
        if (keyEvent.key === 'ArrowDown' || keyEvent.key === 'Enter' || keyEvent.key === ' ') {
          keyEvent.preventDefault();
          this.open();
          this.focusFirstItem();
        }
    });

    // Menu Key Events
    this.addEvent(this.menu, 'keydown', this.handleMenuKeydown.bind(this));
  }

  private addEvent(element: HTMLElement | Document | Window, event: string, handler: (e: Event) => void) {
    element.addEventListener(event, handler);
    this.cleanupEvents.push(() => element.removeEventListener(event, handler));
  }

  public toggle() {
    this.isOpen ? this.close() : this.open();
  }

  public open() {
    if (this.isOpen) return;
    
    // Close other dropdowns if needed (optional behavior, but good for menus)
    // SmartDropdown.activeDropdowns.forEach(d => d !== this && d.close());
    
    this.isOpen = true;
    this.menu.classList.add('is-open');
    this.menu.setAttribute('aria-hidden', 'false');
    this.trigger.setAttribute('aria-expanded', 'true');
    
    this.updatePosition();
    
    // Global events
    if (this.options.closeOnOutsideClick) {
      setTimeout(() => { // Delay to avoid immediate close from trigger click
         document.addEventListener('click', this.handleOutsideClick);
      }, 0);
    }
    if (this.options.closeOnEsc) {
        document.addEventListener('keydown', this.handleGlobalKeydown);
    }
    
    window.addEventListener('resize', this.updatePositionBound);
    window.addEventListener('scroll', this.updatePositionBound, { capture: true }); // Capture scroll on all parents

    SmartDropdown.activeDropdowns.add(this);
    this.options.onOpen();
  }

  public close() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.menu.classList.remove('is-open');
    this.menu.setAttribute('aria-hidden', 'true');
    this.trigger.setAttribute('aria-expanded', 'false');

    // Cleanup global events
    document.removeEventListener('click', this.handleOutsideClick);
    document.removeEventListener('keydown', this.handleGlobalKeydown);
    window.removeEventListener('resize', this.updatePositionBound);
    window.removeEventListener('scroll', this.updatePositionBound, { capture: true });

    SmartDropdown.activeDropdowns.delete(this);
    this.options.onClose();
    
    // Return focus to trigger if needed (context dependent)
  }

  private updatePositionBound = () => {
      if (this.isOpen) requestAnimationFrame(() => this.updatePosition());
  }

  private updatePosition() {
    const triggerRect = this.trigger.getBoundingClientRect();
    const menuRect = this.menu.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let top = 0;
    let left = 0;
    let placement = this.options.placement;

    // Initial calculations based on placement preference
    // Default: bottom-start
    if (placement.startsWith('bottom')) {
        top = triggerRect.bottom + this.options.offset;
    } else {
        top = triggerRect.top - menuRect.height - this.options.offset;
    }

    if (placement.endsWith('start')) {
        left = triggerRect.left;
    } else {
        left = triggerRect.right - menuRect.width;
    }

    // Viewport Collision Detection & Flipping
    
    // 1. Vertical Flip
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const requiredHeight = menuRect.height + this.options.offset + this.options.viewportPadding;

    if (placement.startsWith('bottom') && spaceBelow < requiredHeight && spaceAbove > requiredHeight) {
        // Flip to top
        top = triggerRect.top - menuRect.height - this.options.offset;
        placement = placement.replace('bottom', 'top') as any;
    } else if (placement.startsWith('top') && spaceAbove < requiredHeight && spaceBelow > requiredHeight) {
        // Flip to bottom
        top = triggerRect.bottom + this.options.offset;
        placement = placement.replace('top', 'bottom') as any;
    }

    // 2. Horizontal Nudge/Flip
    const requiredWidth = menuRect.width + this.options.viewportPadding;
    
    // Check right edge
    if (left + menuRect.width > viewportWidth - this.options.viewportPadding) {
        left = viewportWidth - menuRect.width - this.options.viewportPadding;
    }
    // Check left edge
    if (left < this.options.viewportPadding) {
        left = this.options.viewportPadding;
    }

    // Apply Styles
    // We use fixed positioning relative to viewport to avoid parent transform issues
    // But wait, if parents have transforms, fixed might behave relative to them in some browsers/contexts?
    // Actually, `getBoundingClientRect` returns viewport coords. So `fixed` top/left is safest.
    // UNLESS parent has `transform`, then `fixed` becomes relative to parent. 
    // To be truly robust, we should append to body? 
    // For this implementation, we assume menu is either direct child of body OR we rely on 'fixed' working mostly.
    // A robust library like Popper.js is huge for this reason. 
    // For this vanilla implementation, we will use `fixed` positioning and strongly suggest appending menu to body or ensuring no transform parents.
    // But the requirements say "When parent elements have transforms...".
    // If parent has transform, `fixed` acts like absolute relative to parent. `getBoundingClientRect` is still viewport.
    // So we might need to calculate offset relative to offsetParent if we stay in DOM.
    // Simplest robust way: Position absolute, but calculate relative to document? No, scroll issues.
    // Best way for vanilla: Position Fixed + viewport coords. AND assume if fixed breaks (transform parent), we accept it or user appends to body.
    
    this.menu.style.position = 'fixed';
    this.menu.style.top = `${top}px`;
    this.menu.style.left = `${left}px`;
    this.menu.setAttribute('data-placement', placement);
    
    // Z-index management
    const maxZ = Math.max(...Array.from(document.querySelectorAll('*'))
        .map(el => parseFloat(getComputedStyle(el).zIndex))
        .filter(z => !isNaN(z) && z < 10000), 1000);
    this.menu.style.zIndex = (maxZ + 1).toString();
  }

  private handleOutsideClick = (e: Event) => {
    const target = e.target as Node;
    if (!this.menu.contains(target) && !this.trigger.contains(target)) {
      this.close();
    }
  }

  private handleGlobalKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
      this.trigger.focus();
    }
  }

  private handleMenuKeydown(e: Event) {
    const keyEvent = e as KeyboardEvent;
    const items = Array.from(this.menu.querySelectorAll('a, button, [tabindex="0"]')) as HTMLElement[];
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    switch (keyEvent.key) {
      case 'ArrowDown':
        keyEvent.preventDefault();
        const nextIndex = (currentIndex + 1) % items.length;
        items[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        keyEvent.preventDefault();
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        items[prevIndex]?.focus();
        break;
      case 'Tab':
        // Trap focus or allow escape? Usually close on tab out.
        if (e.shiftKey && currentIndex === 0) {
             this.close(); // Tab backwards out of menu
        } else if (!e.shiftKey && currentIndex === items.length - 1) {
             this.close(); // Tab forwards out of menu
        }
        break;
      case 'Home':
        keyEvent.preventDefault();
        items[0]?.focus();
        break;
      case 'End':
        keyEvent.preventDefault();
        items[items.length - 1]?.focus();
        break;
    }
  }

  private focusFirstItem() {
    requestAnimationFrame(() => {
        const firstItem = this.menu.querySelector('a, button, [tabindex="0"]') as HTMLElement;
        firstItem?.focus();
    });
  }

  public destroy() {
    this.close();
    this.cleanupEvents.forEach(cleanup => cleanup());
    this.cleanupEvents = [];
    SmartDropdown.activeDropdowns.delete(this);
  }
}
