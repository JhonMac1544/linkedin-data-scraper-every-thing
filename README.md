# Linkedin Data Scraper ( EVERY-THING )

> Linkedin data scraper (EVERY-THING) is an all-in-one LinkedIn data scraper that can extract people, companies, posts, jobs, searches, and engagement data from a single, flexible interface.
> It helps growth, sales, talent, and analytics teams turn LinkedIn activity into structured, queryable data without manual copy-paste or one-off tools.


<p align="center">
  <a href="https://bitbash.def" target="_blank">
    <img src="https://github.com/za2122/footer-section/blob/main/media/scraper.png" alt="Bitbash Banner" width="100%"></a>
</p>
<p align="center">
  <a href="https://t.me/devpilot1" target="_blank">
    <img src="https://img.shields.io/badge/Chat%20on-Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram">
  </a>&nbsp;
  <a href="https://wa.me/923249868488?text=Hi%20BitBash%2C%20I'm%20interested%20in%20automation." target="_blank">
    <img src="https://img.shields.io/badge/Chat-WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp">
  </a>&nbsp;
  <a href="mailto:sale@bitbash.dev" target="_blank">
    <img src="https://img.shields.io/badge/Email-sale@bitbash.dev-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail">
  </a>&nbsp;
  <a href="https://bitbash.dev" target="_blank">
    <img src="https://img.shields.io/badge/Visit-Website-007BFF?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Website">
  </a>
</p>




<p align="center" style="font-weight:600; margin-top:8px; margin-bottom:8px;">
  Created by Bitbash, built to showcase our approach to Scraping and Automation!<br>
  If you are looking for <strong>Linkedin data scraper ( EVERY-THING )</strong> you've just found your team — Let’s Chat. 👆👆
</p>


## Introduction

This project bundles multiple LinkedIn endpoints into a single, consistent scraper that works with a simple `endpoint` selector and a JSON `body` payload. You choose what you want to scrape (person, company, jobs, posts, searches, or engagement), send the right body, and receive normalized JSON results.

It solves the pain of juggling different tools or writing custom scrapers for each LinkedIn use case. Instead, everything is handled through a predictable API-style interface that you can plug into data pipelines, enrichment workflows, dashboards, or automations.

It’s built for data engineers, growth marketers, recruiters, sales teams, product analysts, and anyone who needs reliable LinkedIn data at scale.

### How the AIO LinkedIn Scraper Works

- You set `endpoint` to one of the supported operations (person data, company data, posts, jobs, search, suggestions, engagement, etc.).
- You send `body` as a JSON object that matches the required input for that endpoint (for example, profile URLs, query strings, page numbers, or filters).
- The scraper runs the request, handles pagination tokens where needed, and returns structured JSON arrays.
- You can batch process up to dozens of profiles or companies per run using the multi-profile and multi-company endpoints.
- Advanced endpoints let you search jobs, posts, people, and companies with filters, as well as pull comments, reactions, shares, and autocomplete suggestions.

## Features

| Feature | Description |
|--------|-------------|
| Single `endpoint` router | Use one tool and switch behavior via the `endpoint` argument (e.g., `person-data`, `company-posts`, `search-jobs`). |
| Person profile scraping | Scrape full public LinkedIn person profiles, including headline, experience, education, and more from a profile URL. |
| Multi-person batch mode | Send up to 50 LinkedIn profile URLs and return structured person data in a single run (25 recommended for best performance). |
| Company profile scraping | Extract public company information such as size, industry, description, website, and follower metrics from company URLs. |
| Multi-company batch mode | Scrape up to 50 company pages in one go, ideal for competitive research or account list enrichment. |
| Person posts scraping | Fetch posts published by a specific person, with pagination via `page` and `paginationToken` for deep timelines. |
| Company posts scraping | Retrieve company posts with simple page-based pagination, no token management required. |
| Job search scraping | Mirror LinkedIn job search with filters for location, job type, experience level, posting recency, company, industry, function, and more. |
| Post search scraping | Search LinkedIn posts by keyword and filter by content type, authors, companies, industries, and mentions. |
| People and company search | Use LinkedIn’s own search logic to discover people and companies by query and rich filter combinations. |
| Engagement & suggestions | Pull comments, reactions, reshares of posts, and autocomplete suggestions for companies, people, functions, industries, locations, schools, and services. |
| Employee count per skill | Estimate how many employees at a company match specific skills or job titles, based on skill keywords and exclusions. |

---

## What Data This Scraper Extracts

| Field Name | Field Description |
|-----------|-------------------|
| `endpoint` | The endpoint you requested (e.g., `person-data`, `company-data`, `search-jobs`). |
| `url` | Canonical LinkedIn URL used as input (person profile, company page, or post link). |
| `urls` | Array of LinkedIn URLs when using multi-person or multi-company endpoints. |
| `fullName` | Person’s full name from their public profile. |
| `headline` | Person’s LinkedIn headline (role, seniority, and positioning text). |
| `location` | Person’s primary location string from their profile. |
| `about` | Person’s “About” section text, if publicly visible. |
| `currentPositions` | Array of current roles, including job title, company, start date, and location. |
| `pastPositions` | Array of past roles with titles, companies, and time ranges. |
| `education` | List of education entries such as schools, degrees, and study periods. |
| `skills` | List of skills and endorsements associated with the profile. |
| `companyName` | Company’s official name from its LinkedIn page. |
| `companyWebsite` | Company website URL if present on the profile. |
| `companyIndustry` | Industry category associated with the company. |
| `companySize` | Size bracket for the company (e.g., 51–200, 1,001–5,000 employees). |
| `companyFoundedYear` | Company founding year, when available. |
| `companyHeadquarters` | City and country of the company headquarters. |
| `followersCount` | Number of followers for a person or company page (where provided). |
| `postId` | Unique identifier of a LinkedIn post. |
| `postUrl` | Direct URL to the LinkedIn post. |
| `postText` | Main text content of the post. |
| `postMedia` | List of attached media (links, images, videos, documents), if available. |
| `postCreatedAt` | Human-readable date/time when the post was published. |
| `postTimestamp` | Machine-usable timestamp for the post. |
| `likesCount` | Number of reactions/likes on a post. |
| `commentsCount` | Number of comments on a post. |
| `sharesCount` | Number of shared/reposted instances of a post. |
| `jobId` | Unique job posting identifier. |
| `jobTitle` | Title of the job listing. |
| `jobCompanyName` | Company that posted the job. |
| `jobCompanyId` | Numeric company ID (URN-derived) backing the job posting. |
| `jobLocation` | Location associated with the job. |
| `jobWorkplaceType` | Workplace type (On-site, Remote, Hybrid) derived from filter codes. |
| `jobEmploymentType` | Employment type (Full-time, Part-time, Contract, etc.). |
| `jobPostedAt` | Human-readable posting time of the job. |
| `jobPostedTimestamp` | Numeric timestamp for the job posting. |
| `jobEasyApply` | Boolean indicating whether the job is Easy Apply. |
| `searchQuery` | Keyword query used for search endpoints (jobs, posts, people, companies). |
| `page` | Page index requested in search or listing endpoints. |
| `paginationToken` | Token used by person posts endpoint for deep pagination. |
| `commentsUrn` | URN identifier used to fetch comments for a post. |
| `reactionsUrn` | URN identifier used to fetch reactions for a post. |
| `repostsUrn` | URN identifier used to fetch reshares for a post. |
| `commentAuthor` | Author of a comment (name and profile reference). |
| `commentText` | Text content of a single comment. |
| `reactionType` | Type of reaction on a post (like, celebrate, support, etc.). |
| `reactor` | Information about the person or entity that reacted. |
| `reshareAuthor` | Author name and profile for a reshare. |
| `suggestionType` | Suggestion category (company, person, function, industry, location, school, service). |
| `suggestionQuery` | Input query that generated suggestions. |
| `suggestedName` | Name of the suggested entity (company, person, industry, etc.). |
| `suggestedId` | Backing numeric ID or URN of the suggested entity. |
| `skillKeywords` | Skill or job title keywords used in the employee count per skill endpoint. |
| `skillExplicits` | Skill IDs excluded from employee count calculations. |
| `employeeCountPerSkill` | Mapping from skill keyword to estimated employee count in a company. |
| `raw` | Optional raw backing object for advanced users who need unprocessed fields. |

---

## Example Output


    [
      {
        "endpoint": "person-data",
        "url": "https://www.linkedin.com/in/ingmar-klein",
        "fullName": "Ingmar Klein",
        "headline": "Senior Software Engineer | Distributed Systems | Team Lead",
        "location": "Berlin, Berlin, Germany",
        "about": "Engineering scalable backend systems and mentoring teams in high-growth environments.",
        "currentPositions": [
          {
            "title": "Senior Software Engineer",
            "companyName": "TechNova Systems",
            "companyId": 1234567,
            "location": "Berlin, Germany",
            "startDate": "2020-06-01"
          }
        ],
        "pastPositions": [
          {
            "title": "Software Engineer",
            "companyName": "CloudBridge",
            "startDate": "2017-02-01",
            "endDate": "2020-05-31"
          }
        ],
        "education": [
          {
            "schoolName": "Technical University of Munich",
            "degree": "M.Sc. Computer Science",
            "startDate": "2014-10-01",
            "endDate": "2016-09-30"
          }
        ],
        "skills": [
          "Distributed Systems",
          "Microservices",
          "Kubernetes",
          "Go",
          "TypeScript"
        ],
        "followersCount": 2130,
        "profilePictureUrl": "https://media.licdn.com/...",
        "timestamp": 1680789311000
      }
    ]

---

## Directory Structure Tree


    Linkedin data scraper ( EVERY-THING )/
    ├── src/
    │   ├── main.js
    │   ├── endpoints/
    │   │   ├── person-data.js
    │   │   ├── multi-person-data.js
    │   │   ├── company-data.js
    │   │   ├── multi-company-data.js
    │   │   ├── person-posts.js
    │   │   ├── company-posts.js
    │   │   ├── search-jobs.js
    │   │   ├── search-posts.js
    │   │   ├── search-people.js
    │   │   ├── search-company.js
    │   │   ├── post-comments.js
    │   │   ├── post-reactions.js
    │   │   ├── post-reshares.js
    │   │   ├── suggestion-company.js
    │   │   ├── suggestion-person.js
    │   │   ├── suggestion-function.js
    │   │   ├── suggestion-industry.js
    │   │   ├── suggestion-location.js
    │   │   ├── suggestion-school.js
    │   │   ├── suggestion-service-category.js
    │   │   └── company-employee-count-per-skill.js
    │   ├── lib/
    │   │   ├── httpClient.js
    │   │   ├── pagination.js
    │   │   ├── linkedin-formatters.js
    │   │   └── validators.js
    │   └── config/
    │       └── defaults.json
    ├── config/
    │   ├── input-schema.json
    │   └── endpoints-map.json
    ├── data/
    │   ├── examples/
    │   │   ├── person-data.json
    │   │   ├── company-data.json
    │   │   ├── search-jobs.json
    │   │   └── search-posts.json
    │   └── inputs.sample.json
    ├── tests/
    │   ├── person-data.test.js
    │   ├── company-data.test.js
    │   ├── search-jobs.test.js
    │   └── utils.test.js
    ├── .env.example
    ├── package.json
    ├── package-lock.json
    ├── LICENSE
    └── README.md

---

## Use Cases

- **Sales teams** use it to enrich prospect lists with live LinkedIn profile and company details, so they can prioritize outreach based on role, seniority, and company size.
- **Recruiters and talent sourcers** use it to search people and jobs, scrape candidate profiles, and monitor new relevant job postings, so they can react faster than competitors.
- **Growth and marketing teams** use it to track company and personal posts, comments, and reactions, so they can measure engagement and identify high-performing content themes.
- **Data and analytics teams** use it to pull large volumes of people, company, and job data, so they can build dashboards, market maps, and talent or customer intelligence models.
- **Founders and strategy teams** use it to monitor competitors’ hiring, posting frequency, and employee skills, so they can spot strategic moves and market shifts early.

---

## FAQs

**Q1: How do I choose which LinkedIn resource to scrape?**
You control behavior through the `endpoint` field in the input. For example, use `person-data` for a single profile, `multi-person-data` for multiple profiles, `company-data` for a single company, `search-jobs` for job search, or `post-comments` for comments on a post. Each endpoint has a documented JSON body shape, so once you select the endpoint, you simply provide the required fields.

**Q2: What does the `body` field look like in practice?**
`body` is always a JSON object. For a single person profile, you might send `{ "url": "https://www.linkedin.com/in/ingmar-klein" }`. For multiple people, you pass `{ "urls": [ "...", "..." ] }`. For searches, you pass a mix of `query`, `page`, and optional filters like `experience`, `jobType`, or `locationIdsList`. The structure is stable and intentionally close to how filters appear on LinkedIn itself.

**Q3: How does pagination work for posts and searches?**
Some endpoints use simple `page` numbers (e.g., company posts, job search, post search, people search, company search), where each page returns a fixed number of results. The person posts endpoint adds `paginationToken`: you set `page` and pass an empty string for page 1, then use the returned token for subsequent pages. This pattern gives you deep access to long timelines while keeping requests predictable.

**Q4: Can I run large batches of profiles or companies?**
Yes, the multi-profile and multi-company endpoints were designed for batching. They can accept up to 50 URLs per run, but for stability and speed it’s recommended to keep batches below 20–25 URLs at a time. That way, you get a good balance between throughput and reliability and can process large datasets in multiple controlled batches.

---

## Performance Benchmarks and Results

**Primary Metric – Scraping Speed**
On typical network conditions, a mixed workload of person profiles and company pages processes roughly 80–120 records per hour when using conservative batch sizes and respecting platform limits. Search endpoints (jobs, posts, people, companies) usually return a page of 10–20 items in a few seconds.

**Reliability Metric – Run Success Rate**
With sensible batching (under 25 URLs per multi-call) and realistic paging depths, success rates above 95% are common across endpoints. Occasional failures are usually tied to unavailable profiles, deleted posts, or aggressive rate limiting on extremely large crawls.

**Efficiency Metric – Throughput per Run**
Combining multi-person, multi-company, and search endpoints, it’s realistic to capture several thousand structured records in a single session by chaining multiple runs, without manual intervention. Filters like `experience`, `industryIdsList`, `functionIdsList`, and `locationIdsList` help keep the returned dataset focused and reduce wasted bandwidth.

**Quality Metric – Data Completeness and Precision**
For public, accessible profiles and companies, key fields such as names, headlines, titles, company info, and job attributes are typically present and well structured. Some profiles that are out of network or heavily restricted may surface as generic entries (e.g., with placeholders instead of full details), but the scraper keeps identifiers and URLs where possible so you can still track or deduplicate them in your data pipeline.


<p align="center">
<a href="https://calendar.app.google/74kEaAQ5LWbM8CQNA" target="_blank">
  <img src="https://img.shields.io/badge/Book%20a%20Call%20with%20Us-34A853?style=for-the-badge&logo=googlecalendar&logoColor=white" alt="Book a Call">
</a>
  <a href="https://www.youtube.com/@bitbash-demos/videos" target="_blank">
    <img src="https://img.shields.io/badge/🎥%20Watch%20demos%20-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Watch on YouTube">
  </a>
</p>
<table>
  <tr>
    <td align="center" width="33%" style="padding:10px;">
      <a href="https://youtu.be/MLkvGB8ZZIk" target="_blank">
        <img src="https://github.com/za2122/footer-section/blob/main/media/review1.gif" alt="Review 1" width="100%" style="border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
      </a>
      <p style="font-size:14px; line-height:1.5; color:#444; margin:0 15px;">
        “Bitbash is a top-tier automation partner, innovative, reliable, and dedicated to delivering real results every time.”
      </p>
      <p style="margin:10px 0 0; font-weight:600;">Nathan Pennington
        <br><span style="color:#888;">Marketer</span>
        <br><span style="color:#f5a623;">★★★★★</span>
      </p>
    </td>
    <td align="center" width="33%" style="padding:10px;">
      <a href="https://youtu.be/8-tw8Omw9qk" target="_blank">
        <img src="https://github.com/za2122/footer-section/blob/main/media/review2.gif" alt="Review 2" width="100%" style="border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
      </a>
      <p style="font-size:14px; line-height:1.5; color:#444; margin:0 15px;">
        “Bitbash delivers outstanding quality, speed, and professionalism, truly a team you can rely on.”
      </p>
      <p style="margin:10px 0 0; font-weight:600;">Eliza
        <br><span style="color:#888;">SEO Affiliate Expert</span>
        <br><span style="color:#f5a623;">★★★★★</span>
      </p>
    </td>
    <td align="center" width="33%" style="padding:10px;">
      <a href="https://youtube.com/shorts/6AwB5omXrIM" target="_blank">
        <img src="https://github.com/za2122/footer-section/blob/main/media/review3.gif" alt="Review 3" width="35%" style="border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
      </a>
      <p style="font-size:14px; line-height:1.5; color:#444; margin:0 15px;">
        “Exceptional results, clear communication, and flawless delivery. Bitbash nailed it.”
      </p>
      <p style="margin:10px 0 0; font-weight:600;">Syed
        <br><span style="color:#888;">Digital Strategist</span>
        <br><span style="color:#f5a623;">★★★★★</span>
      </p>
    </td>
  </tr>
</table>
