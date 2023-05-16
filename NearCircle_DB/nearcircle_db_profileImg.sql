CREATE TABLE `profile_Img` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `img` longblob,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKilnhaxs1389ei8d9npfy3q3xy` (`user_id`),
  CONSTRAINT `FKilnhaxs1389ei8d9npfy3q3xy` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
)