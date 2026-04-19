import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Abdulkadir",
  lastName: "GUVEN",
  name: `Abdulkadir GUVEN`,
  role: "Data Engineer",
  avatar: "/images/avatar.jpg",
  email: "abguven@gmail.com",
  location: "Europe/Paris", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  city: "Grand Est, France",
  languages: [ "French", "English", "Turkish"], 
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/abguven",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/abguven/",
    essential: true,
  },
  {
    name: "Trailhead",
    icon: "salesforce",
    link: "https://www.salesforce.com/trailblazer/abguven",
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Turning data complexity into business clarity</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">RAG Chatbot</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured project
        </Text>
      </Row>
    ),
    href: "/work/puls-events-rag",
  },
  subline: (
    <>
      I'm Abdulkadir, a Data Engineer building scalable pipelines and data architectures —{" "}
      from ETL to streaming to <Text as="span" size="xl" weight="strong">GenAI</Text>.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/abguven",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        After 14 years of entrepreneurship and a successful transition to software engineering (ETL / Backend),
        I now design scalable data architectures in direct service of business challenges.
        <ul style={{marginTop: "16px", marginBottom: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px"}}>
          <li><strong>Analytical mindset & Finance</strong> — Passionate about applied mathematics and a stock market investor since 2018, I approach data with a desire to understand the underlying mechanisms and logic behind its evolution.</li>
          <li><strong>Bug hunter</strong> — Debugging and stress-testing systems is a genuine intellectual challenge. This rigor led to a contribution to scikit-learn (used by millions of Data Analysts), identifying a <a href="https://github.com/scikit-learn/scikit-learn/issues/32589" target="_blank" rel="noopener noreferrer">complex regression</a> that was subsequently <a href="https://github.com/scikit-learn/scikit-learn/pull/32592" target="_blank" rel="noopener noreferrer">fixed upstream</a>.</li>
          <li><strong>Cognitive empathy</strong> — I adopt a human-centered approach by systematically putting myself in the shoes of those who will use my data, deploy my solutions, or read my documentation.</li>
        </ul>
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "OpenClassrooms",
        timeframe: "June 2025 - Present",
        role: "Data Engineer (Intensive Project-Based Training)",
        achievements: [
          <>
            Designed and deployed 12 production-ready data architectures covering Batch, Streaming,
            NoSQL, and Cloud (AWS, Docker, Kestra).
          </>,
          <>
            Implemented robust ETL pipelines: from local scripts to scalable Cloud architectures,
            with data quality validation (Pydantic, Great Expectations) and distributed processing
            (Apache Spark, Kafka/Redpanda).
          </>,
          "Discovered and documented a regression bug in scikit-learn, with the fix validated upstream for version 1.8.",
        ],
        images: [],
      },
      {
        company: "Cyncly",
        timeframe: "October 2022 - September 2024",
        role: "Analyst Programmer — Salesforce & R&D Innovation",
        achievements: [
          <>
            Designed and maintained ETL pipelines via Talend to synchronize data between Salesforce,
            Zendesk, and the ERP. Automated monitoring and nightly jobs on Azure to guarantee
            production data integrity.
          </>,
          "R&D GenAI: developed an AI Companion (MVP, Top 5 internal innovation) connecting the OpenAI API to company data via RAG/Vector Stores, and a ChatterPrice prototype for querying Salesforce in natural language.",
          "Acquired 88 badges and 108,000+ points on Salesforce Trailhead alongside project missions.",
        ],
        images: [],
      },
      {
        company: "Guven Pub",
        timeframe: "2008 - October 2022",
        role: "Managing Director",
        achievements: [
          <>
            Full company management for 14 years — client relations, business development, and
            translation of client needs into technical and graphic solutions.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "OpenClassrooms",
        description: (
          <>
            <strong>Expert en Ingénierie des Données</strong> — RNCP Level 7 (Master equivalent)<br />
            June 2025 – June 2026 · ongoing<br />
            Intensive program via 12 Big Data, Cloud, MLOps and Data Engineering architecture projects.
          </>
        ),
      },
      {
        name: "OpenClassrooms",
        description: (
          <>
            <strong>Développeur Web</strong> — RNCP Level 5 (Bac+2)<br />
            2021 – 2022<br />
            Fullstack development (React, Angular, Node.js), REST API design, relational and NoSQL databases.
          </>
        ),
      },
      {
        name: "Université Henri Poincaré",
        description: (
          <>
            <strong>DUT Génie Électrique et Informatique Industrielle</strong><br />
            2003 – 2005<br />
            Foundations in algorithms, automation and signal processing.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Data Processing & Streaming",
        description: <>Apache Spark (PySpark), Kafka/Redpanda, Debezium (CDC), Delta Lake, Polars, DuckDB, Pandas.</>,
        tags: [
          { name: "Apache Spark", icon: "spark" },
          { name: "Kafka", icon: "kafka" },
          { name: "Polars", icon: "polars" },
          { name: "DuckDB", icon: "duckdb" },
          { name: "Pandas", icon: "pandas" },
        ],
        images: [],
      },
      {
        title: "Orchestration & Cloud Infrastructure",
        description: <>AWS (S3, ECS, Lambda, Redshift), Terraform, Apache Airflow, Kestra, Airbyte, Docker, CI/CD.</>,
        tags: [
          { name: "AWS", icon: "aws" },
          { name: "Terraform", icon: "terraform" },
          { name: "Apache Airflow", icon: "airflow" },
          { name: "Airbyte", icon: "airbyte" },
          { name: "Docker", icon: "docker" },
        ],
        images: [],
      },
      {
        title: "Databases & Storage",
        description: <>PostgreSQL, MS SQL Server, MongoDB (Sharding/ReplicaSet), OLAP/Star Schema, Power BI.</>,
        tags: [
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "MS SQL Server", icon: "mssql" },
          { name: "MongoDB", icon: "mongodb" },
        ],
        images: [],
      },
      {
        title: "Software Engineering & AI",
        description: <>Python (advanced), SQL, Talend, Salesforce APEX, scikit-learn, BentoML, RAG/LangChain, Faiss/Vector stores.</>,
        tags: [
          { name: "Python", icon: "python" },
          { name: "scikit-learn", icon: "scikitlearn" },
          { name: "Talend", icon: "talend" },
          { name: "LangChain", icon: "langchain" },
          { name: "BentoML", icon: "bentoml" },
          { name: "Salesforce", icon: "salesforce" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Data engineering projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/contact",
  label: "Contact",
  title: `Contact – ${person.name}`,
  description: `Get in touch with ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
