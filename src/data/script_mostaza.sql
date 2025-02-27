USE smaa;

INSERT INTO smaa.colaborador(cola_usuario, cola_contrasena, cola_tipo_colaborador)
VALUES("mostaza3.14159", "$2b$10$zWSqQ0KA.s4HQM.mt5RXseIL3I9SKQdEtvDryEBCNFNnRUBsWVCAe", "persona_juridica");

SELECT cola_id INTO @mostazaID FROM smaa.colaborador WHERE cola_usuario = "mostaza3.14159";

INSERT INTO smaa.persona_juridica(pj_id, pj_razon_social, pj_tipo, pj_rubro, pj_mail)
VALUES(@mostazaID, "Mostaza", "Empresa", "Gastronomía", "mostaza@gmail.com");

INSERT INTO smaa.heladera (hela_colaborador,hela_nombre,hela_capacidad,hela_fecha_registro,hela_estado,hela_direccion,hela_longitud,hela_latitud)
VALUES
(@mostazaID,"Mostaza Palermo J B Justo",100,"2025-02-01","activa","-34.578428, -58.426622",-58.426622,-34.578428),
(@mostazaID,"Mostaza Corrientes y J B Justo",100,"2025-02-01","activa","-34.594875, -58.444303",-58.444303,-34.594875),
(@mostazaID,"Mostaza Triunvirato y Monroe",100,"2025-02-01","activa","-34.574244, -58.486613",-58.486613,-34.574244),
(@mostazaID,"Mostaza ChangoMas Villa Pueyrredón",100,"2025-02-01","activa","-34.573389, -58.505105",-58.505105,-34.573389),
(@mostazaID,"Mostaza Carrefour San Martín",100,"2025-02-01","activa","-34.584994, -58.518730",-58.518730,-34.584994),
(@mostazaID,"Mostaza Cabildo y Juramento",100,"2025-02-01","activa","-34.561570, -58.457167",-58.457167,-34.561570),
(@mostazaID,"Mostaza Cabildo y Monroe",100,"2025-02-01","activa","-34.558025, -58.460261",-58.460261,-34.558025),
(@mostazaID,"Mostaza Diagonal Norte",100,"2025-02-01","activa","-34.607501, -58.374805",-58.374805,-34.607501),
(@mostazaID,"Mostaza Corrientes y 9 de Julio",100,"2025-02-01","activa","-34.603705, -58.380523",-58.380523,-34.603705),
(@mostazaID,"Mostaza Florida 1",100,"2025-02-27","activa","-34.604994, -58.375142",-58.375142,-34.604994),
(@mostazaID,"Mostaza Florida 2",100,"2025-02-01","activa","-34.603012, -58.375234",-58.375234,-34.603012),
(@mostazaID,"Mostaza Av de Mayo y 9 de Julio",100,"2025-02-01","activa","-34.609026, -58.380429",-58.380429,-34.609026),
(@mostazaID,"Mostaza San Jose y Av de Mayo",100,"2025-02-01","activa","-34.609564, -58.386283",-58.386283,-34.609564),
(@mostazaID,"Mostaza Puerto Madero",100,"2025-02-01","activa","-34.606747, -58.364255",-58.364255,-34.606747),
(@mostazaID,"Mostaza Córdoba y 9 de Julio",100,"2025-02-01","activa","-34.599091, -58.381098",-58.381098,-34.599091),
(@mostazaID,"Mostaza Santa Fe y 9 de Julio",100,"2025-02-01","activa","-34.595396, -58.383046",-58.383046,-34.595396),
(@mostazaID,"Mostaza Córdoba y Figueroa",100,"2025-02-01","activa","-34.597706, -58.421788",-58.421788,-34.597706);
