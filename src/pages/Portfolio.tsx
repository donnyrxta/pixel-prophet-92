/**
 * Portfolio Page - Filterable project gallery with case studies
 * Showcases completed work across all service categories
 */
import { useState } from "react";
import { Header } from "@/components/Header";
import FloatingContact from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BUSINESS_INFO } from "@/lib/constants";

type ProjectCategory = "All" | "Printing" | "Branding" | "Digital" | "Signage";

interface Project {
  id: number;
  title: string;
  client: string;
  category: ProjectCategory;
  image: string;
  description: string;
  results: string[];
  testimonial?: string;
}

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sample portfolio projects
  const projects: Project[] = [
    {
      id: 1,
      title: "Corporate Rebrand & Identity",
      client: "Tech Startup Zimbabwe",
      category: "Branding",
      image: "/images/hero/kaffie-co-7hEZILVOcFU-unsplash.jpg",
      description: "Complete brand identity redesign including logo, color palette, typography system, and brand guidelines.",
      results: [
        "40% increase in brand recognition",
        "New website with 5x higher engagement",
        "Complete stationery suite delivered"
      ],
      testimonial: "Soho Connect transformed our brand identity beyond expectations."
    },
    {
      id: 2,
      title: "Annual Report Design & Print",
      client: "NGO Harare",
      category: "Printing",
      image: "/images/hero/kaffie-co-DJb2MdMuzbU-unsplash.jpg",
      description: "80-page full-color annual report with custom infographics, professional photography, and premium finishing.",
      results: [
        "500 copies delivered on time",
        "Premium matte finish",
        "Custom infographic design"
      ]
    },
    {
      id: 3,
      title: "Social Media Campaign",
      client: "Retail Brand",
      category: "Digital",
      image: "/images/hero/charlesdeluvio-Lks7vei-eAg-unsplash.jpg",
      description: "3-month social media campaign with content creation, paid ads, and influencer partnerships.",
      results: [
        "300% increase in followers",
        "5x ROI on ad spend",
        "12 viral posts"
      ],
      testimonial: "Our online presence exploded thanks to Soho Connect's digital expertise."
    },
    {
      id: 4,
      title: "Retail Signage Installation",
      client: "Shopping Mall Tenant",
      category: "Signage",
      image: "/images/hero/creatopy-M35xxKGb_tA-unsplash.jpg",
      description: "Complete storefront signage including LED-lit channel letters, window graphics, and directional signs.",
      results: [
        "Installed in 48 hours",
        "Premium LED lighting",
        "Weather-resistant materials"
      ]
    },
    {
      id: 5,
      title: "Marketing Collateral Suite",
      client: "Real Estate Agency",
      category: "Printing",
      image: "/images/hero/tanaka-malote-V3VKKSayZP0-unsplash.jpg",
      description: "Business cards, flyers, brochures, and property listing sheets with consistent branding.",
      results: [
        "10,000+ pieces printed",
        "Same-day rush service",
        "Premium card stock"
      ]
    },
    {
      id: 6,
      title: "Website Redesign & SEO",
      client: "Law Firm",
      category: "Digital",
      image: "/images/hero/kaffie-co-7hEZILVOcFU-unsplash.jpg",
      description: "Modern responsive website with SEO optimization and content strategy.",
      results: [
        "150% increase in organic traffic",
        "Mobile-first design",
        "Google #1 rankings for 5 keywords"
      ],
      testimonial: "Finally, a website that generates leads for our firm."
    }
  ];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const categories: ProjectCategory[] = ["All", "Printing", "Branding", "Digital", "Signage"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      <FloatingContact />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              {BUSINESS_INFO.servicesCount} Completed Projects
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Work Speaks for Itself
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore projects that helped Harare businesses grow through strategic design, print, and marketing.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
                className="px-6"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border hover:border-primary"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                    {project.category}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{project.client}</p>
                  <p className="text-gray-700 line-clamp-2">{project.description}</p>
                  <div className="mt-4 text-primary font-medium text-sm group-hover:underline">
                    View Details →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's create something amazing together
          </p>
          <Button size="lg" variant="secondary" className="gap-2">
            Start Your Project
          </Button>
        </div>
      </section>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div>
                  <Badge className="mb-2">{selectedProject.category}</Badge>
                  <h4 className="font-semibold text-gray-900 mb-2">Client: {selectedProject.client}</h4>
                  <p className="text-gray-700">{selectedProject.description}</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Results Achieved:</h4>
                  <ul className="space-y-2">
                    {selectedProject.results.map((result, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-gray-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {selectedProject.testimonial && (
                  <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                    <p className="text-gray-700 italic">"{selectedProject.testimonial}"</p>
                    <p className="text-sm text-gray-600 mt-2">— {selectedProject.client}</p>
                  </div>
                )}
                <Button className="w-full">Start Similar Project</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Portfolio;
