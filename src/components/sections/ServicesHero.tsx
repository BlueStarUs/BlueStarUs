import React from "react";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { HeroActions } from "@/components/ui/HeroActions";

export function ServicesHero() {
  return (
    <BreadcrumbHero
      breadcrumbs={[{ label: "Our Services" }]}
      badge="College Admissions Advisory"
      title="Comprehensive Support for Your College Journey"
      description="Build the right plan, explore programs, get expert guidance, and access the resources you need, all in one place."
      actions={
        <HeroActions
          primary={{ label: "Find a Program", href: "#programs" }}
          secondary={{ label: "Explore Resources", href: "/resources" }}
        />
      }
    />
  );
}
