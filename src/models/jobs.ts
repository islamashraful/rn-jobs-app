export interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo: string;
  job_country: string;
  job_employment_type: string;
}

export interface JobDetails {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo: string;
  job_country: string;
  job_employment_type: string;
  job_highlights?: {
    Qualifications?: string[];
    Responsibilities?: string[];
  };
  job_description: string;
  job_google_link?: string;
}
