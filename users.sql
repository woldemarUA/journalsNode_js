--
-- PostgreSQL database dump
--

-- Dumped from database version 13.14 (Debian 13.14-1.pgdg120+2)
-- Dumped by pg_dump version 13.13

-- Started on 2024-03-22 17:06:43 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 16387)
-- Name: users; Type: TABLE; Schema: public; Owner: authRoot
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    hashed_password character(60) NOT NULL,
    email character varying(255) NOT NULL,
    roles character varying(100)[]
);


ALTER TABLE public.users OWNER TO "authRoot";

--
-- TOC entry 200 (class 1259 OID 16385)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: authRoot
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO "authRoot";

--
-- TOC entry 3019 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: authRoot
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2877 (class 2604 OID 16390)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: authRoot
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3013 (class 0 OID 16387)
-- Dependencies: 201
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: authRoot
--

COPY public.users (id, username, hashed_password, email, roles) FROM stdin;
2	frenchMan3	$2b$10$VVikvSOgqF6.VQJcFHh/VO/CCEDG6K8iEkzXXXp5itDa9QfKCcche	another@email.route	{user}
4	woldemar	$2b$10$cY/h6KBJVg.o3mt6MBbtIOvzudoKC5qoFru242mwp/TPzOy9cqJj6	another@email.route	{user}
12	innessa	$2b$10$pffnQ6gs6nnUqGpDQubPYudasnTfGCBre.Fc6N2xxIn/nHRxbwN6i	ingrit81@gmail.com	{user}
9	mario	$2b$10$ctY.S9xuHop3c/BmWJ0L0Onucoe3.yN47aHaCGuNrLO62pqb4rGYu	ingrit81@gmail.com	{user,admin}
\.


--
-- TOC entry 3020 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: authRoot
--

SELECT pg_catalog.setval('public.users_id_seq', 16, true);


--
-- TOC entry 2879 (class 2606 OID 16395)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: authRoot
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2881 (class 2606 OID 16397)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: authRoot
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


-- Completed on 2024-03-22 17:06:43 UTC

--
-- PostgreSQL database dump complete
--

