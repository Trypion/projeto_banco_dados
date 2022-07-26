CREATE DATABASE dev;
\c dev

CREATE TABLE public.banks
(
    bank_id SERIAL NOT NULL,
    name character varying(250) NOT NULL,
    created_at date NOT NULL,
    deleted_at date,
    PRIMARY KEY (bank_id)
);

ALTER TABLE IF EXISTS public.banks
    OWNER to postgres;

CREATE TABLE public.boxes
(
    box_id SERIAL NOT NULL,
    bank_id bigint NOT NULL,
    "number" bigint NOT NULL,
    name character varying(250) NOT NULL,
    created_at date NOT NULL,
    deleted_at date,
    PRIMARY KEY (box_id),
    CONSTRAINT bank_fk FOREIGN KEY (bank_id)
        REFERENCES public.banks (bank_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.boxes
    OWNER to postgres;


CREATE TABLE public.rules
(
    rule_id SERIAL NOT NULL,
    box_id bigint NOT NULL,
    name character varying(250) NOT NULL,
    field character varying(250) NOT NULL,
    operator character varying(250) NOT NULL,
    value character varying(250) NOT NULL,
    created_at date NOT NULL,
    deleted_at date,
    PRIMARY KEY (rule_id),
    CONSTRAINT box_fk FOREIGN KEY (box_id)
        REFERENCES public.boxes (box_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.rules
    OWNER to postgres;

CREATE TABLE public.clients
(
    client_id SERIAL NOT NULL,
    name character varying(250) NOT NULL,
    cpf character varying(250) NOT NULL,
    phone character varying(250),
    created_at date NOT NULL,
    deleted_at date,
    PRIMARY KEY (client_id)
);

ALTER TABLE IF EXISTS public.clients
    OWNER to postgres;

CREATE TABLE public.analysts
(
    analyst_id SERIAL NOT NULL,
    name character varying(250) NOT NULL,
    created_at date NOT NULL,
    deleted_at date,
    PRIMARY KEY (analyst_id)
);

ALTER TABLE IF EXISTS public.analysts
    OWNER to postgres;

CREATE TABLE public.status
(
    status_id SERIAL NOT NULL,
    name character varying(250) NOT NULL,
    created_at date NOT NULL,
    deleted_at date,
    PRIMARY KEY (status_id)
);

ALTER TABLE IF EXISTS public.status
    OWNER to postgres;


CREATE TABLE public.contracts
(
    contract_id SERIAL NOT NULL,
    client_id bigint NOT NULL,
    box_id bigint NOT NULL,
    status_id bigint NOT NULL,
    value bigint NOT NULL,
    created_at date NOT NULL,
    deleted_at date,
    PRIMARY KEY (contract_id),
    CONSTRAINT box_fk FOREIGN KEY (box_id)
        REFERENCES public.boxes (box_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT client_fk FOREIGN KEY (client_id)
        REFERENCES public.clients (client_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT status_fk FOREIGN KEY (status_id)
        REFERENCES public.status (status_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.contracts
    OWNER to postgres;

CREATE TABLE public.contract_events
(
    contract_event_id SERIAL NOT NULL,
    contract_id bigint NOT NULL,
    analyst_id bigint NOT NULL,
    name character varying(250) NOT NULL,
    created_at date NOT NULL,
    PRIMARY KEY (contract_event_id),
    CONSTRAINT contract_fk FOREIGN KEY (contract_id)
        REFERENCES public.contracts (contract_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT analyst_fk FOREIGN KEY (analyst_id)
        REFERENCES public.analysts (analyst_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.contract_events
    OWNER to postgres;

CREATE TABLE public.status_motives
(
    motive_id SERIAL NOT NULL,
    status_id bigint NOT NULL,
    name character varying(250) NOT NULL,
    created_at date NOT NULL,
    deleted_at date,
    PRIMARY KEY (motive_id),
    CONSTRAINT status_fk FOREIGN KEY (status_id)
        REFERENCES public.status (status_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.status_motives
    OWNER to postgres;

CREATE TABLE public.status_submotives
(
    submotive_id SERIAL NOT NULL,
    motive_id bigint NOT NULL,
    name character varying(250) NOT NULL,
    created_at date NOT NULL,
    deleted_at date,
    PRIMARY KEY (submotive_id),
    CONSTRAINT motive_fk FOREIGN KEY (motive_id)
        REFERENCES public.status_motives (motive_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.status_submotives
    OWNER to postgres;

CREATE TABLE public.event_submotive
(
    id SERIAL NOT NULL,
    contract_event_id bigint NOT NULL,
    submotive_id bigint NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT event_fk FOREIGN KEY (contract_event_id)
        REFERENCES public.contract_events (contract_event_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT submotive_fk FOREIGN KEY (submotive_id)
        REFERENCES public.status_submotives (submotive_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.event_submotive
    OWNER to postgres;


INSERT INTO public.banks(
	name, created_at)
	VALUES ('bradesco', '2020-03-01');
	
INSERT INTO public.banks(
	name, created_at)
	VALUES ('itau', '2020-03-01');
	
INSERT INTO public.banks(
	name, created_at)
	VALUES ('santander', '2020-03-01');


INSERT INTO public.boxes(
	bank_id, "number", name, created_at)
	VALUES (1, 1, 'gaveta 1', '2020-04-01');
	
INSERT INTO public.boxes(
	bank_id, "number", name, created_at)
	VALUES (1, 2, 'gaveta 2', '2020-04-01');
	
INSERT INTO public.boxes(
	bank_id, "number", name, created_at)
	VALUES (2, 1, 'gaveta 1', '2020-04-01');
	
INSERT INTO public.boxes(
	bank_id, "number", name, created_at)
	VALUES (3, 1, 'gaveta 1', '2020-04-01');

INSERT INTO public.clients(
	name, cpf, phone, created_at)
	VALUES ('Joao', '14154805088', '49999999999', '2020-04-01');

INSERT INTO public.clients(
	name, cpf, phone, created_at)
	VALUES ('Pedro', '05810282016', '49999999999', '2020-04-01');
	
INSERT INTO public.clients(
	name, cpf, phone, created_at)
	VALUES ('Lucas', '93376181098', '49999999999', '2020-04-01');

INSERT INTO public.rules(
	box_id, name, field, operator, value, created_at)
	VALUES (1, 'regra 1', 'value', 'lower', '2000', '2020-04-01');
	
INSERT INTO public.rules(
	box_id, name, field, operator, value, created_at)
	VALUES (1, 'regra 2', 'value', 'greater', '5000', '2020-04-01');
	
INSERT INTO public.rules(
	box_id, name, field, operator, value, created_at)
	VALUES (2, 'regra 1', 'value', 'greater', '2000', '2020-04-01');
	
INSERT INTO public.rules(
	box_id, name, field, operator, value, created_at)
	VALUES (3, 'regra 1', 'value', 'greater', '2000', '2020-04-01');
	
INSERT INTO public.rules(
	box_id, name, field, operator, value, created_at)
	VALUES (4, 'regra 1', 'value', 'greater', '2000', '2020-04-01');

INSERT INTO public.status(
	name, created_at)
	VALUES ('aguardando analise', '2020-04-01');
	
INSERT INTO public.status(
	name, created_at)
	VALUES ('aprovado', '2020-04-01');
	
INSERT INTO public.status(
	name, created_at)
	VALUES ('recusado', '2020-04-01');
	
INSERT INTO public.status(
	name, created_at)
	VALUES ('pendente', '2020-04-01');

INSERT INTO public.status_motives(
	status_id, name, created_at)
	VALUES (1, 'motivo 1', '2020-04-01');

INSERT INTO public.status_motives(
	status_id, name, created_at)
	VALUES (2, 'motivo 1', '2020-04-01');
	
INSERT INTO public.status_motives(
	status_id, name, created_at)
	VALUES (3, 'motivo 1', '2020-04-01');
	
INSERT INTO public.status_motives(
	status_id, name, created_at)
	VALUES (4, 'motivo 1', '2020-04-01');
	
INSERT INTO public.status_motives(
	status_id, name, created_at)
	VALUES (1, 'motivo 2', '2020-04-01');

INSERT INTO public.status_submotives(
	motive_id, name, created_at)
	VALUES (1, 'submotive 1', '2020-04-01');
	
INSERT INTO public.status_submotives(
	motive_id, name, created_at)
	VALUES (1, 'submotive 1', '2020-04-01');
	
INSERT INTO public.status_submotives(
	motive_id, name, created_at)
	VALUES (1, 'submotive 2', '2020-04-01');	
	
INSERT INTO public.status_submotives(
	motive_id, name, created_at)
	VALUES (3, 'submotive 1', '2020-04-01');
	
INSERT INTO public.status_submotives(
	motive_id, name, created_at)
	VALUES (4, 'submotive 1', '2020-04-01');	
	
INSERT INTO public.status_submotives(
	motive_id, name, created_at)
	VALUES (5, 'submotive 1', '2020-04-01');

INSERT INTO public.contracts(
	client_id, box_id, status_id, value, created_at)
	VALUES (1, 1, 1, 2000, '2020-04-01');

INSERT INTO public.contracts(
	client_id, box_id, status_id, value, created_at)
	VALUES (2, 2, 3, 5000, '2020-04-01');
	
INSERT INTO public.contracts(
	client_id, box_id, status_id, value, created_at)
	VALUES (3, 3, 4, 10000, '2020-04-01');
	
INSERT INTO public.contracts(
	client_id, box_id, status_id, value, created_at)
	VALUES (1, 4, 2, 11500, '2020-04-01');

INSERT INTO public.analysts(
	name, created_at)
	VALUES ('Salvador', '2020-04-01');
	
INSERT INTO public.analysts(
	name, created_at)
	VALUES ('Rodrigo', '2020-04-01');
	
INSERT INTO public.analysts(
	name, created_at)
	VALUES ('Getulio', '2020-04-01');

INSERT INTO public.contract_events(
	contract_id, analyst_id, name, created_at)
	VALUES (1, 1, 'inserido', '2020-04-01');
	
INSERT INTO public.contract_events(
	contract_id, analyst_id, name, created_at)
	VALUES (2, 1, 'inserido', '2020-04-01');
	
INSERT INTO public.contract_events(
	contract_id, analyst_id, name, created_at)
	VALUES (3, 1, 'inserido', '2020-04-01');
	
INSERT INTO public.contract_events(
	contract_id, analyst_id, name, created_at)
	VALUES (4, 1, 'inserido', '2020-04-01');
	
INSERT INTO public.contract_events(
	contract_id, analyst_id, name, created_at)
	VALUES (4, 2, 'aprovado', '2020-04-02');
	
INSERT INTO public.contract_events(
	contract_id, analyst_id, name, created_at)
	VALUES (4, 2, 'pendente', '2020-04-01');

INSERT INTO public.contract_events(
	contract_id, analyst_id, name, created_at)
	VALUES (3, 3, 'pendente', '2020-04-01');

INSERT INTO public.contract_events(
	contract_id, analyst_id, name, created_at)
	VALUES (2, 2, 'recusado', '2020-04-01');

INSERT INTO public.event_submotive(
	contract_event_id, submotive_id)
	VALUES (5, 1);
	
INSERT INTO public.event_submotive(
	contract_event_id, submotive_id)
	VALUES (6, 2);

INSERT INTO public.event_submotive(
	contract_event_id, submotive_id)
	VALUES (7, 3);
	
INSERT INTO public.event_submotive(
	contract_event_id, submotive_id)
	VALUES (8, 1);
	
INSERT INTO public.event_submotive(
	contract_event_id, submotive_id)
	VALUES (5, 2);
	
INSERT INTO public.event_submotive(
	contract_event_id, submotive_id)
	VALUES (6, 2);
	
INSERT INTO public.event_submotive(
	contract_event_id, submotive_id)
	VALUES (1, 1);
	
INSERT INTO public.event_submotive(
	contract_event_id, submotive_id)
	VALUES (1, 1);
