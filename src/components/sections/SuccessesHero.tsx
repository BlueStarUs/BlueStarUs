import React from "react";
import { BreadcrumbHero } from "@/components/ui/BreadcrumbHero";
import { HeroActions } from "@/components/ui/HeroActions";
import { HUBSPOT_CONSULTATION_URL } from "@/lib/constants";

export function SuccessesHero() {
  return (
    <BreadcrumbHero
      breadcrumbs={[{ label: "Successes & Results" }]}
      badge="Proven Track Record of Success"
      title="A Proven Track Record of College Admissions Success"
      description="Year after year, we have helped our students achieve their dreams and get into their desired schools. Here are some of our students' successes."
      actions={
        <HeroActions
          primary={{ label: "Book a Consultation", href: HUBSPOT_CONSULTATION_URL }}
          secondary={{ label: "Explore Yearly Acceptances", href: "#cycles-records" }}
        />
      }
    />
  );
}
