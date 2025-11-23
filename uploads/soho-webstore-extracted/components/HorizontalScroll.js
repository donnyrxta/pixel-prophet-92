/**
 * HorizontalScroll renders its children in a horizontally scrollable
 * container. This component enables the tactile feel of swiping
 * through cards on mobile while preserving accessibility on desktop.
 * Use it to display product recommendations, adverts or any
 * horizontally oriented list. Items are spaced with a consistent
 * gap. Parent components should pass in the array of items and a
 * render function.
 *
 * @param {Object} props
 * @param {Array} props.items - The data array to render.
 * @param {Function} props.renderItem - Function returning an element for each item.
 */
export default function HorizontalScroll({ items, renderItem }) {
  return (
    <div className="overflow-x-auto py-4">
      <div className="flex gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex-shrink-0">
            {renderItem(item, idx)}
          </div>
        ))}
      </div>
    </div>
  );
}