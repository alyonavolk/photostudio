-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Мар 19 2023 г., 19:30
-- Версия сервера: 10.4.25-MariaDB
-- Версия PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `photostudionew`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cheque`
--

CREATE TABLE `cheque` (
  `id_cheque` int(11) NOT NULL,
  `services_id` int(11) DEFAULT NULL,
  `rate_id` int(11) DEFAULT NULL,
  `сh_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `cheque`
--

INSERT INTO `cheque` (`id_cheque`, `services_id`, `rate_id`, `сh_price`) VALUES
(1, 1, 1, '7500.00'),
(2, 3, 1, '3000.00'),
(3, 6, 2, '480.00'),
(4, 2, 1, '4000.00'),
(5, 5, 2, '5160.00'),
(6, 4, 1, '5700.00'),
(7, 4, 1, '5700.00');

-- --------------------------------------------------------

--
-- Структура таблицы `customer`
--

CREATE TABLE `customer` (
  `id_customer` int(11) NOT NULL,
  `c_fio` varchar(40) NOT NULL,
  `c_telephone` varchar(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `customer`
--

INSERT INTO `customer` (`id_customer`, `c_fio`, `c_telephone`) VALUES
(1, 'Ковалева Ульяна Дмитриевна', '7(992)607-83-43'),
(2, 'Киселев Роман Иванович', '7(994)408-02-29'),
(3, 'Рыбакова Арина Данииловна', '7(902)429-11-28'),
(4, 'Сергеев Денис Михайлович', '7(904)206-97-30'),
(5, 'Дубова Виктория Егоровна', '7(968)408-63-57');

-- --------------------------------------------------------

--
-- Структура таблицы `order`
--

CREATE TABLE `order` (
  `id_order` int(11) NOT NULL,
  `cheque_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `o_dataOrder` datetime NOT NULL,
  `o_dateCompletion` datetime NOT NULL,
  `o_readiness` bit(1) DEFAULT b'0',
  `o_issuingOrder` bit(1) DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `order`
--

INSERT INTO `order` (`id_order`, `cheque_id`, `customer_id`, `o_dataOrder`, `o_dateCompletion`, `o_readiness`, `o_issuingOrder`) VALUES
(1, 1, 1, '2023-03-02 12:08:00', '2023-03-15 12:00:00', b'1', b'1'),
(2, 2, 2, '2023-03-02 15:13:00', '2023-03-15 10:00:00', b'0', b'0'),
(3, 3, 3, '2023-03-17 10:09:00', '2023-03-20 12:00:00', b'1', b'0'),
(4, 4, 4, '2023-03-02 13:23:00', '2023-03-13 15:00:00', b'1', b'0'),
(5, 5, 3, '2023-03-16 11:34:00', '2023-03-21 13:00:00', b'0', b'0'),
(6, 6, 5, '2023-03-10 16:01:00', '2023-03-25 11:00:00', b'0', b'0'),
(7, 7, 1, '2023-03-12 15:55:00', '2023-03-28 12:00:00', b'0', b'0');

-- --------------------------------------------------------

--
-- Структура таблицы `rate`
--

CREATE TABLE `rate` (
  `id_rate` int(11) NOT NULL,
  `r_name` varchar(40) NOT NULL,
  `r_premium` decimal(4,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `rate`
--

INSERT INTO `rate` (`id_rate`, `r_name`, `r_premium`) VALUES
(1, 'обычный', '0.00'),
(2, 'срочный', '0.20');

-- --------------------------------------------------------

--
-- Структура таблицы `typeservices`
--

CREATE TABLE `typeservices` (
  `id_services` int(11) NOT NULL,
  `s_name` varchar(50) NOT NULL,
  `s_price` decimal(10,2) NOT NULL,
  `s_numberImages` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `typeservices`
--

INSERT INTO `typeservices` (`id_services`, `s_name`, `s_price`, `s_numberImages`) VALUES
(1, 'Черно-белая фотография', '7500.00', 100),
(2, 'Концептуальная фотография', '4000.00', 80),
(3, 'Рекламная фотография', '3000.00', 50),
(4, 'Уличная фотография', '5700.00', 85),
(5, 'Портретная фотография', '4300.00', 55),
(6, 'Фотография на документы', '400.00', 10);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cheque`
--
ALTER TABLE `cheque`
  ADD PRIMARY KEY (`id_cheque`),
  ADD KEY `services_id` (`services_id`),
  ADD KEY `rate_id` (`rate_id`);

--
-- Индексы таблицы `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id_customer`);

--
-- Индексы таблицы `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `cheque_id` (`cheque_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Индексы таблицы `rate`
--
ALTER TABLE `rate`
  ADD PRIMARY KEY (`id_rate`);

--
-- Индексы таблицы `typeservices`
--
ALTER TABLE `typeservices`
  ADD PRIMARY KEY (`id_services`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cheque`
--
ALTER TABLE `cheque`
  MODIFY `id_cheque` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `customer`
--
ALTER TABLE `customer`
  MODIFY `id_customer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `order`
--
ALTER TABLE `order`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `rate`
--
ALTER TABLE `rate`
  MODIFY `id_rate` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `typeservices`
--
ALTER TABLE `typeservices`
  MODIFY `id_services` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `cheque`
--
ALTER TABLE `cheque`
  ADD CONSTRAINT `FK_Rate` FOREIGN KEY (`rate_id`) REFERENCES `rate` (`id_rate`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Services` FOREIGN KEY (`services_id`) REFERENCES `typeservices` (`id_services`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `FK_Cheque` FOREIGN KEY (`cheque_id`) REFERENCES `cheque` (`id_cheque`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id_customer`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
