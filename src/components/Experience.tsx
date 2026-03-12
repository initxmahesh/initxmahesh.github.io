interface ExperienceRole {
  title: string;
  period: string;
  mode?: string;
  highlights: string[];
}

interface ExperienceCompany {
  company: string;
  location: string;
  // employment?: string;
  totalDuration?: string;
  roles: ExperienceRole[];
}

const experiences: ExperienceCompany[] = [
  {
    company: "T.E.J. Center",
    location: "Kupondole, Lalitpur, Nepal",
    roles: [
      {
        title: "Jr. Software Engineer",
        period: "Jan 2026 - Present",
        highlights: [
          "Designed and deployed full-stack applications.",
          "Containerized applications using Docker.",
          "Designed CI/CD pipelines with GitHub Actions.",
          "Built a full-stack application with React.js, Node.js, Express.js, PostgreSQL, and Tailwind CSS, supporting 500+ concurrent users and 20% faster load times.",
        ],
      },
    ],
  },
  {
    company: "Microsoft Student Ambassadors",
    location: "Nepal",
    // employment: "Full-time",
    roles: [
      {
        title: "Beta Microsoft Student Ambassador",
        period: "Nov 2023 - May 2025",
        mode: "Remote",
        highlights: [
          "Organized and supported community learning initiatives and events.",
          "Built skills across cloud and developer technologies through ambassador activities.",
        ],
      },
      {
        title: "Alpha Microsoft Learn Student Ambassador",
        period: "Sep 2023 - Nov 2023",
        mode: "Remote",
        highlights: [
          "Contributed to student community initiatives and event planning.",
        ],
      },
      {
        title: "Microsoft Learn Student Ambassador",
        period: "Sep 2023",
        mode: "Remote",
        highlights: [
          "Joined the MLSA program and supported event planning and learning initiatives.",
        ],
      },
    ],
  },
  {
    company: "CS50x Nepal",
    location: "Nepal",
    // employment: "Part-time",
    roles: [
      {
        title: "University Lead | Instructor",
        period: "May 2024 - May 2025",
        mode: "On-site",
        highlights: [
          "Led and instructed CS50 AI Nepal 2025, the second edition of CS50x Nepal, hosted for the first time in Nepal at IOE Purwanchal Campus under EXCESS.",
          "Delivered an intensive 5-week OpenCourseWare adaptation of Harvard’s CS50 Introduction to Artificial Intelligence with Python, introducing students to core AI fundamentals.",
          "Supported program execution end-to-end, including coordination and delivery.",
        ],
      },
      {
        title: "Instructor",
        period: "Jan 2024 - Mar 2024",
        mode: "On-site",
        highlights: [
          "Taught as an instructor for CS50x Nepal, an OpenCourseWare adaptation of Harvard’s CS50x lectures hosted at IOE Purwanchal Campus.",
          "Supported sessions and learner progress through the program.",
        ],
      },
    ],
  },
  {
    company:
      "Electronics And Communication Engineering Student Society (EXCESS)",
    location: "Dharan, Sunsari, Nepal",
    // employment: "Full-time",
    roles: [
      {
        title: "President",
        period: "May 2024 - May 2025",
        mode: "On-site",
        highlights: [
          "Led an active student community and drove major initiatives across engineering and tech learning.",
          "Led CS50 AI Nepal 2025, a localized adaptation of Harvard’s CS50 AI course.",
          "Organized our main hackathon, X-Hack 3.0.",
          "Started GuffGaff, a student talk series for sharing ideas.",
          "Launched the Data Fellowship Program, helping 100+ students build practical data science skills and a culture of innovation, teamwork, and inclusive learning.",
        ],
      },
      {
        title: "Vice President",
        period: "Mar 2023 - May 2024",
        mode: "On-site",
        highlights: [
          "Served as Vice President of the Electronics and Communication Engineering Student Society (EXCESS).",
        ],
      },
      {
        title: "Executive Committee Member",
        period: "May 2022 - Mar 2023",
        mode: "Hybrid",
        highlights: [
          "Contributed to planning and executing student-focused events and programs.",
        ],
      },
    ],
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      aria-label="Work Experience"
      className="py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="section-number">02</span>
          <div className="h-px flex-1 bg-border" />
          <span className="code-tag">experience.json</span>
        </div>

        <div className="space-y-10">
          {experiences.map((exp) => (
            <article
              key={exp.company}
              className="rounded-xl border border-border bg-background/60 backdrop-blur-sm"
            >
              <div className="p-6 md:p-7">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-6">
                  <div className="space-y-1">
                    <h3 className="text-lg md:text-xl font-semibold leading-tight">
                      {exp.company}
                    </h3>
                    {exp.employment && (
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5">
                          {exp.employment}
                        </span>
                      </div>
                    )}
                  </div>

                  {exp.location && (
                    <div className="md:text-right">
                      <span className="font-mono text-xs text-muted-foreground">
                        {exp.location}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <div className="space-y-8">
                    {exp.roles.map((role, roleIndex) => (
                      <div key={`${exp.company}-${role.title}-${role.period}`}>
                        <div className="relative pl-6">
                          <div className="absolute left-0 top-1.5 h-full w-px bg-border" />
                          <div className="absolute -left-[6px] top-1.5 w-3.5 h-3.5 rounded-full bg-accent ring-2 ring-border" />

                          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="text-base md:text-lg font-semibold">
                                  {role.title}
                                </h4>
                                {role.mode && (
                                  <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                                    {role.mode}
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="font-mono text-xs text-muted-foreground">
                              {role.period}
                            </span>
                          </div>

                          <ul className="mt-3 space-y-2 text-muted-foreground text-sm list-disc pl-5">
                            {role.highlights.map((item, itemIndex) => (
                              <li key={itemIndex}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        {roleIndex < exp.roles.length - 1 && (
                          <div className="h-6" aria-hidden="true" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
