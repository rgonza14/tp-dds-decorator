USE smaa;

INSERT INTO smaa.colaborador(cola_usuario, cola_contrasena, cola_tipo_colaborador)
VALUES("flamas4572.", "$2b$10$oJrP72zr4a87HHeWEXDzE.8t0V7Awzzf24xCb0ctzc5hTPKdLa3O.", "persona_humana");

SELECT cola_id INTO @flamasID FROM smaa.colaborador WHERE cola_usuario = "flamas4572.";

INSERT INTO smaa.persona_humana(ph_id, ph_dni_tipo, ph_dni_nro, ph_nombre, ph_apellido, ph_telefono, ph_mail, ph_fecha_nacimiento, ph_direccion)
VALUES(@flamasID, "DNI", "39270487", "Federico", "Lamas", "1139544454", "federicolamas95@gmail.com", "1995-11-18T00:00:00.000Z", "Maipu 2049");

INSERT INTO smaa.donacion_vianda (dv_comida,dv_fecha_doncacion,dv_fecha_caducidad,dv_calorias,dv_peso,dv_estado,dv_colaborador,dv_heladera)
VALUES
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1),
("pollo al horno con papas","2025-02-25","2025-02-28",2500.00,600.00,"entregada",@flamasID,1);




INSERT INTO smaa.persona_situacion_vulnerable(psv_nombre, psv_apellido, psv_fecha_nacimiento, psv_fecha_registro, psv_colaborador, psv_menores_a_cargo)
VALUES ("Hermes", "Lamas", "2024-01-01", "2025-01-01", @flamasID, 0);

SELECT psv_id INTO @hermesID FROM smaa.persona_situacion_vulnerable WHERE psv_nombre = "Hermes";

INSERT INTO smaa.extraccion_vianda(extr_vianda, extr_beneficiario, extr_fecha)
VALUES
(1, @hermesID, "2025-02-25"),
(2, @hermesID, "2025-02-25"),
(3, @hermesID, "2025-02-25"),
(4, @hermesID, "2025-02-26"),
(5, @hermesID, "2025-02-26"),
(6, @hermesID, "2025-02-26"),
(7, @hermesID, "2025-02-27"),
(8, @hermesID, "2025-02-27"),
(9, @hermesID, "2025-02-27");

UPDATE smaa.donacion_vianda SET dv_estado = "consumida" WHERE dv_id < 10;

