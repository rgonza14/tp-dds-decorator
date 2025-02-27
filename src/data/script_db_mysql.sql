DROP DATABASE smaa;
CREATE DATABASE smaa;

USE smaa;

-- Creación de tablas

CREATE TABLE smaa.colaborador(
	cola_id INT NOT NULL AUTO_INCREMENT,
    cola_usuario CHAR(64) NOT NULL UNIQUE,
    cola_contrasena CHAR(64) NOT NULL,
    cola_tipo_colaborador CHAR(50) NOT NULL,
    cola_baja BOOLEAN DEFAULT false,
    PRIMARY KEY (cola_id)
);

CREATE TABLE smaa.persona_juridica(
	pj_id INT NOT NULL,
    pj_razon_social CHAR(50),
    pj_tipo CHAR(50),
    pj_rubro CHAR(50),
    pj_direccion CHAR(50),
    pj_telefono CHAR(50),
    pj_mail CHAR(50),
    PRIMARY KEY (pj_id),
    FOREIGN KEY (pj_id) REFERENCES smaa.colaborador(cola_id)
);

CREATE TABLE smaa.persona_humana(
	ph_id INT NOT NULL,
    ph_dni_tipo CHAR(3),
    ph_dni_nro CHAR(10),
    ph_nombre CHAR(50),
    ph_apellido CHAR(50),
    ph_telefono CHAR(50),
    ph_mail CHAR(50),
    ph_fecha_nacimiento CHAR(50),
    ph_direccion CHAR(50),
    PRIMARY KEY (ph_id),
    FOREIGN KEY (ph_id) REFERENCES smaa.colaborador(cola_id)
);

CREATE TABLE smaa.tarjeta_colaborador(
	tarc_id INT NOT NULL AUTO_INCREMENT,
	tarc_nro CHAR(11) NOT NULL UNIQUE,
    tarc_fecha_alta DATE,
    tarc_colaborador INT,
    PRIMARY KEY (tarc_id),
    FOREIGN KEY (tarc_colaborador) REFERENCES smaa.colaborador(cola_id)
);

CREATE TABLE smaa.persona_situacion_vulnerable(
	psv_id INT NOT NULL AUTO_INCREMENT,
    psv_nombre CHAR(50),
    psv_apellido CHAR(50),
    psv_fecha_nacimiento DATE,
    psv_fecha_registro DATE,
    psv_colaborador INT,
    psv_direccion CHAR(50),
    psv_dni_tipo CHAR(3),
    psv_dni_nro CHAR(10),
    psv_menores_a_cargo INT,
    psv_baja BOOLEAN DEFAULT false,
    PRIMARY KEY (psv_id),
    FOREIGN KEY (psv_colaborador) REFERENCES smaa.colaborador(cola_id)
);

CREATE TABLE smaa.tarjeta_beneficiario(
	tarb_id INT NOT NULL AUTO_INCREMENT,
	tarb_nro CHAR(11) UNIQUE,
    tarb_fecha_alta DATE,
    tarb_colaborador INT,
    tarb_beneficiario INT,
    PRIMARY KEY (tarb_id),
    FOREIGN KEY (tarb_colaborador) REFERENCES smaa.colaborador(cola_id),
    FOREIGN KEY (tarb_beneficiario) REFERENCES smaa.persona_situacion_vulnerable(psv_id)
);

CREATE TABLE smaa.donacion_dinero(
	dd_id INT NOT NULL AUTO_INCREMENT,
    dd_colaborador INT,
    dd_monto DECIMAL(20,2),
    dd_frecuencia CHAR(50),
    dd_fecha DATE,
    PRIMARY KEY (dd_id),
    FOREIGN KEY (dd_colaborador) REFERENCES smaa.colaborador(cola_id)
);

CREATE TABLE smaa.heladera(
	hela_id INT NOT NULL AUTO_INCREMENT,
    hela_nombre CHAR(50),
    hela_capacidad INT,
    hela_fecha_registro DATE,
    hela_estado CHAR(50),
    hela_direccion CHAR(50),
    hela_longitud DECIMAL(8,6),
    hela_latitud DECIMAL(8,6),
    hela_colaborador INT,
    PRIMARY KEY (hela_id),
    FOREIGN KEY (hela_colaborador) REFERENCES smaa.colaborador(cola_id)
);

CREATE TABLE smaa.donacion_vianda(
	dv_id INT NOT NULL AUTO_INCREMENT,
    dv_comida CHAR(50),
    dv_fecha_doncacion DATE,
    dv_fecha_caducidad DATE,
    dv_calorias DECIMAL(10,2),
    dv_peso DECIMAL(10,2),
    dv_estado CHAR(50),
    dv_colaborador INT,
    dv_heladera INT,
    PRIMARY KEY (dv_id),
    FOREIGN KEY (dv_colaborador) REFERENCES smaa.colaborador(cola_id),
    FOREIGN KEY (dv_heladera) REFERENCES smaa.heladera(hela_id)
);

CREATE TABLE smaa.distribucion_vianda(
	dist_id INT NOT NULL AUTO_INCREMENT,
    dist_colaborador INT,
    dist_heladera_origen INT,
    dist_heladera_destino INT,
    dist_estado CHAR(50),
    dist_cantidad DECIMAL(10,2),
    dist_motivo CHAR(50),
    dist_fecha DATE,
    PRIMARY KEY (dist_id),
    FOREIGN KEY (dist_colaborador) REFERENCES smaa.colaborador(cola_id),
    FOREIGN KEY (dist_heladera_origen) REFERENCES smaa.heladera(hela_id),
    FOREIGN KEY (dist_heladera_destino) REFERENCES smaa.heladera(hela_id)
);

CREATE TABLE smaa.extraccion_vianda(
	extr_id INT NOT NULL AUTO_INCREMENT,
    extr_vianda INT NOT NULL UNIQUE,
    extr_beneficiario INT NOT NULL,
    extr_fecha DATE,
    PRIMARY KEY (extr_id),
    FOREIGN KEY (extr_vianda) REFERENCES smaa.donacion_vianda(dv_id),
    FOREIGN KEY (extr_beneficiario) REFERENCES smaa.persona_situacion_vulnerable(psv_id)
);

CREATE TABLE smaa.coeficiente_reconocimiento(
	coef_id INT NOT NULL AUTO_INCREMENT,
    coef_descripcion CHAR(50) UNIQUE,
    coef_coeficiente DECIMAL(10,2),
    PRIMARY KEY (coef_id)
);

CREATE TABLE smaa.suscripcion_heladera(
    susc_colaborador INT NOT NULL,
    susc_heladera INT NOT NULL,
    susc_notif_n_viandas_disponibles INT,
    susc_notif_n_viandas_faltantes INT,
    susc_notif_desperfecto BOOLEAN,
    PRIMARY KEY (susc_colaborador, susc_heladera),
    FOREIGN KEY (susc_colaborador) REFERENCES smaa.colaborador(cola_id),
    FOREIGN KEY (susc_heladera) REFERENCES smaa.heladera(hela_id)
);

CREATE TABLE smaa.tecnico(
	tec_id INT NOT NULL AUTO_INCREMENT,
    tec_nombre CHAR(50),
    tec_apellido CHAR(50),
    tec_dni_tipo CHAR(3),
    tec_dni_nro DECIMAL(10,0),
    tec_cuil char(12),
    tec_mail CHAR(50),
    tec_telefono CHAR(50),
    tec_area_cobertura CHAR(50),
    tec_baja BOOLEAN DEFAULT false,
    PRIMARY KEY (tec_id)
);

CREATE TABLE smaa.incidente(
	inc_id INT NOT NULL AUTO_INCREMENT,
    inc_heladera INT,
    inc_colaborador INT,
    inc_tipo CHAR(50),
    inc_fecha_registro DATETIME,
    inc_estado CHAR(50),
    inc_descripcion CHAR(200),
    PRIMARY KEY (inc_id),
    FOREIGN KEY (inc_heladera) REFERENCES smaa.heladera(hela_id)
);

CREATE TABLE smaa.visita_tecnica(
	vite_id INT NOT NULL AUTO_INCREMENT,
    vite_incidente INT,
    vite_tecnico INT,
    vite_fecha_visita DATETIME,
    vite_reporte CHAR(200),
    vite_resuelto BOOLEAN,
    PRIMARY KEY (vite_id),
    FOREIGN KEY (vite_incidente) REFERENCES smaa.incidente(inc_id),
    FOREIGN KEY (vite_tecnico) REFERENCES smaa.tecnico(tec_id)
);

INSERT INTO smaa.colaborador(cola_usuario, cola_contrasena, cola_tipo_colaborador)
VALUES ("decoratorAdmin3.1416", "$2b$10$k8U8DydaoaoflBAdpwO2YeUqpXJe0cip3Tm83fiYyw/GGqAidCqke", "admin");
INSERT INTO smaa.persona_humana(ph_id)
VALUES (1);

INSERT INTO smaa.coeficiente_reconocimiento(coef_descripcion, coef_coeficiente)
VALUES
("PESOS_DONADOS", 0.5),
("VIANDAS_DISTRIBUIDAS", 1),
("VIANDAS_DONADAS", 1.5),
("TARJETAS_REPARTIDAS", 2),
("ACTIVIDAD_HELADERAS", 5);