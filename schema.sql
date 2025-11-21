-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.academic_terms (
  term_id integer NOT NULL DEFAULT nextval('academic_terms_term_id_seq'::regclass),
  academic_year integer NOT NULL,
  semester character varying NOT NULL,
  calendar_year integer,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT academic_terms_pkey PRIMARY KEY (term_id)
);
CREATE TABLE public.citizen_detail (
  student_id character varying NOT NULL,
  citizen_card_addr text,
  citizen_card_postcode character varying,
  citizen_card_province character varying,
  citizen_card_district character varying,
  citizen_card_sub_district character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT citizen_detail_pkey PRIMARY KEY (student_id),
  CONSTRAINT citizen_detail_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id)
);
CREATE TABLE public.current_addr (
  student_id character varying NOT NULL,
  current_postcode character varying,
  current_province character varying,
  current_district character varying,
  current_sub_district character varying,
  current_addr text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT current_addr_pkey PRIMARY KEY (student_id),
  CONSTRAINT current_addr_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id)
);
CREATE TABLE public.defense_exam (
  defense_exam_id integer NOT NULL DEFAULT nextval('defense_exam_defense_exam_id_seq'::regclass),
  student_id character varying,
  date date,
  status character varying,
  edit text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT defense_exam_pkey PRIMARY KEY (defense_exam_id),
  CONSTRAINT defense_exam_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id)
);
CREATE TABLE public.proposal_exam (
  proposal_exam_id integer NOT NULL DEFAULT nextval('proposal_exam_proposal_exam_id_seq'::regclass),
  student_id character varying,
  date date,
  status character varying,
  edit text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT proposal_exam_pkey PRIMARY KEY (proposal_exam_id),
  CONSTRAINT proposal_exam_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id)
);
CREATE TABLE public.student_grades (
  grade_id integer NOT NULL DEFAULT nextval('student_grades_grade_id_seq'::regclass),
  student_id character varying,
  subject_id integer,
  term_id integer,
  grade character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT student_grades_pkey PRIMARY KEY (grade_id),
  CONSTRAINT student_grades_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id),
  CONSTRAINT student_grades_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(subject_id),
  CONSTRAINT student_grades_term_id_fkey FOREIGN KEY (term_id) REFERENCES public.academic_terms(term_id)
);
CREATE TABLE public.students (
  student_id character varying NOT NULL,
  prefix character varying,
  first_name character varying NOT NULL,
  last_name character varying,
  age integer,
  citizen_id character varying,
  tel character varying,
  personal_email character varying,
  rsu_email character varying,
  graduated_from character varying,
  gpa numeric,
  license_number character varying,
  work_addr text,
  work_position character varying,
  status character varying,
  main_advisor character varying,
  co_advisor character varying,
  published boolean DEFAULT false,
  complete_nofi boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  dob date,
  CONSTRAINT students_pkey PRIMARY KEY (student_id)
);
CREATE TABLE public.subjects (
  subject_id integer NOT NULL DEFAULT nextval('subjects_subject_id_seq'::regclass),
  subject_code character varying NOT NULL UNIQUE,
  subject_name character varying NOT NULL,
  credits integer,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT subjects_pkey PRIMARY KEY (subject_id)
);