/*
Navicat MySQL Data Transfer

Source Server         : 96uat
Source Server Version : 50724
Source Host           : 10.161.9.96:3306
Source Database       : votes

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2019-05-10 09:29:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `list`
-- ----------------------------
DROP TABLE IF EXISTS `list`;
CREATE TABLE `list` (
  `lid` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL DEFAULT '0' COMMENT '第几期',
  `uid` int(11) NOT NULL DEFAULT '0',
  `share_date` bigint(20) NOT NULL DEFAULT '0',
  `create_date` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`lid`)
) ENGINE=InnoDB AUTO_INCREMENT=156 DEFAULT CHARSET=utf8 COMMENT='每期名单';

-- ----------------------------
-- Records of list
-- ----------------------------
INSERT INTO `list` VALUES ('139', '18', '3', '1553184000000', '1551423102872');
INSERT INTO `list` VALUES ('140', '18', '16', '1553788800000', '1551423102872');
INSERT INTO `list` VALUES ('141', '18', '4', '1554393600000', '1551423102872');
INSERT INTO `list` VALUES ('142', '18', '6', '1554998400000', '1551423102872');
INSERT INTO `list` VALUES ('143', '18', '17', '1555603200000', '1551423102872');
INSERT INTO `list` VALUES ('144', '18', '10', '1556208000000', '1551423102872');
INSERT INTO `list` VALUES ('145', '18', '2', '1556812800000', '1551423102872');
INSERT INTO `list` VALUES ('146', '18', '8', '1557417600000', '1551423102872');
INSERT INTO `list` VALUES ('147', '18', '11', '1558022400000', '1551423102872');
INSERT INTO `list` VALUES ('148', '18', '18', '1558627200000', '1551423102872');
INSERT INTO `list` VALUES ('149', '18', '9', '1559232000000', '1551423102872');
INSERT INTO `list` VALUES ('150', '18', '7', '1559836800000', '1551423102872');
INSERT INTO `list` VALUES ('151', '18', '5', '1560441600000', '1551423102872');
INSERT INTO `list` VALUES ('152', '18', '14', '1561046400000', '1551423102872');
INSERT INTO `list` VALUES ('153', '18', '12', '1561651200000', '1551423102872');
INSERT INTO `list` VALUES ('154', '18', '15', '1562256000000', '1551423102872');
INSERT INTO `list` VALUES ('155', '18', '13', '1562860800000', '1551423102872');

-- ----------------------------
-- Table structure for `phase`
-- ----------------------------
DROP TABLE IF EXISTS `phase`;
CREATE TABLE `phase` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `create_date` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='第几期';

-- ----------------------------
-- Records of phase
-- ----------------------------
INSERT INTO `phase` VALUES ('18', 'P1', '1551423102869');

-- ----------------------------
-- Table structure for `subject`
-- ----------------------------
DROP TABLE IF EXISTS `subject`;
CREATE TABLE `subject` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `lid` int(11) NOT NULL DEFAULT '0',
  `pid` int(11) DEFAULT NULL,
  `uid` int(11) NOT NULL DEFAULT '0',
  `subject` varchar(255) NOT NULL,
  `introduction` mediumtext,
  `status` int(11) DEFAULT '0',
  `create_date` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COMMENT='share subject';

-- ----------------------------
-- Records of subject
-- ----------------------------
INSERT INTO `subject` VALUES ('29', '140', '18', '16', 'Vue浅谈', '<p>vue的特点，发展历程和目标，与其他相似框架的对比</p>', '0', '1552271393463');
INSERT INTO `subject` VALUES ('30', '140', '18', '16', 'Git，一个开源的分布式版本控制系统', '<p>git的发展和特点，与集中式版本的优缺点对比</p>', '0', '1552272023041');
INSERT INTO `subject` VALUES ('31', '140', '18', '16', '前端万金油——JQuery', '<p>jq诞生及语言特点</p>', '0', '1552272923907');
INSERT INTO `subject` VALUES ('32', '139', '18', '3', 'Docker Basics', '<p><span style=\"color: rgb(0, 0, 0);\">Docker is an open platform for developers and sysadmins of distributed applications.</span></p>', '0', '1552356437717');
INSERT INTO `subject` VALUES ('33', '139', '18', '3', 'Webpack ', '<p><span style=\"color: rgb(43, 58, 66);\">Webpack&nbsp;is a&nbsp;</span><em style=\"color: rgb(43, 58, 66);\">static module bundler</em><span style=\"color: rgb(43, 58, 66);\">&nbsp;for modern JavaScript applications. When webpack processes your application, it internally builds a&nbsp;</span><a href=\"https://webpack.js.org/concepts/dependency-graph/\" target=\"_blank\" style=\"color: rgb(26, 107, 172);\">dependency graph</a><span style=\"color: rgb(43, 58, 66);\">&nbsp;which maps every module your project needs and generates one or more&nbsp;</span><em style=\"color: rgb(43, 58, 66);\">bundles</em><span style=\"color: rgb(43, 58, 66);\">.</span></p>', '0', '1552356451931');
INSERT INTO `subject` VALUES ('34', '139', '18', '3', 'ESLint', '<p><span style=\"color: rgb(51, 51, 51);\">ESLint is an open source project originally created by&nbsp;</span><a href=\"http://nczonline.net/\" target=\"_blank\" style=\"color: rgb(75, 50, 195);\">Nicholas C. Zakas</a><span style=\"color: rgb(51, 51, 51);\">&nbsp;in June 2013. Its goal is to provide a pluggable linting utility for JavaScript.</span></p>', '0', '1552356467114');
INSERT INTO `subject` VALUES ('35', '142', '18', '6', 'The details of design can not be ignored.', '<p>* The importance of details.</p><p>* The normal type of design (Graphic Design, web design,APP design), Design specifications should be noted</p><p>*&nbsp;Good-looking design example analysis</p>', '0', '1553834230783');
INSERT INTO `subject` VALUES ('36', '142', '18', '6', 'How to use your mind to complete a design', '<p>*&nbsp;Design Definition</p><p>*&nbsp;Designer\'s common design method</p><p>*&nbsp;Practical demonstration</p>', '0', '1553834305959');
INSERT INTO `subject` VALUES ('37', '142', '18', '6', 'Common app motion design', '<p>* the effect of dynamic design</p><p>* app common motion design types and&nbsp;practical examples</p><p>* Briefly demonstrate how to make a dynamic effect in the design</p>', '0', '1553834376035');
INSERT INTO `subject` VALUES ('38', '143', '18', '17', 'Reactive Extensions', '<p><span style=\"color: rgb(102, 102, 102);\">In&nbsp;software&nbsp;programming,&nbsp; Reactive Extensions is a set oftools allowing imperative </span><span style=\"color: rgb(102, 102, 102); background-color: rgb(167, 216, 255);\">programming </span><span style=\"color: rgb(102, 102, 102);\">languages tooperate on sequences of data regardless of whether thedata is synchronous or asynchronous. It provides a set ofsequence operators that operate on each item in thesequence. It is an implementation of reactive programmingand provides a blueprint for the tools to be implemented inmultiple programming languages.</span></p>', '0', '1554098362802');
INSERT INTO `subject` VALUES ('39', '143', '18', '17', 'Angular component and js component ', '<p>A way to make JS component into Angular component</p>', '0', '1554098706244');
INSERT INTO `subject` VALUES ('40', '143', '18', '17', 'Typescript & Promise', '<p>The relation between await<span style=\"color: rgb(51, 51, 51);\">/async&nbsp;in typescript and promise </span></p>', '0', '1554098809574');
INSERT INTO `subject` VALUES ('41', '144', '18', '10', 'Node create a chat room', '<p>Node create a chat room</p>', '0', '1556093174631');
INSERT INTO `subject` VALUES ('42', '144', '18', '10', 'Node Operating database', '<p>Node Operating database</p>', '0', '1556093286022');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL DEFAULT 'NULL',
  `password` varchar(255) NOT NULL DEFAULT 'NULL',
  `type` int(11) DEFAULT NULL COMMENT '1.admin ; 2.normal user',
  `token` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `group` varchar(255) NOT NULL DEFAULT 'NULL',
  `create_date` bigint(20) NOT NULL DEFAULT '0',
  UNIQUE KEY `uid` (`uid`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='user table';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '123456', '1', '725f2d111cc117fc746badfee9aa215b', null, '', '1552377206375');
INSERT INTO `user` VALUES ('2', 'hnsyang', '123456', '0', 'a7e9bb18d25f665735fccc786a243736', 'hins', 'java', '1555572024530');
INSERT INTO `user` VALUES ('3', 'mss.mo', '1234567', '0', '84b1c88ce25b4984a24ca5f276ea8f65', 'mos', 'java', '1552356261518');
INSERT INTO `user` VALUES ('4', 'chery.mo', '123456', '0', '0368aecbe0ac1162c24ffb3f82dd475c', 'cher', 'java', '1551424902889');
INSERT INTO `user` VALUES ('5', 'kein.zhng', '123456', '0', '8c94b40fb11b67d462e3e7544738e9e6', 'kevin.', 'java', '1556162868861');
INSERT INTO `user` VALUES ('6', 'jenfer.zen', '123456', '0', 'd78a9f95d0d47ef4ed1e9d57e7ccc158', 'jennifer', 'java', '1553674602500');
INSERT INTO `user` VALUES ('7', 'dio.liu', '123456', '0', '739b639dabdfd8feaa5a93c49f2ddd6b', 'din', 'java', '1555576840948');
INSERT INTO `user` VALUES ('8', 'linafeng', '123456', '0', 'fdd89f4b2f9140b6273575308683964a', 'lina', 'java', '1556265165936');
INSERT INTO `user` VALUES ('9', 'en.luo', '123456', '0', '7e19de953227e412524c8c192667463e', 'ke', 'net', '1552893706213');
INSERT INTO `user` VALUES ('10', 'nihol.cen', '123456', '0', '27f333988f8d543c97cfd683165e482e', 'nichol', 'net', '1555034083597');
INSERT INTO `user` VALUES ('11', 'matix.dng', '123456', '0', '1a33e73dd7630f3c3264bfbb1dda5e7a', 'matrix', 'net', '1551423305946');
INSERT INTO `user` VALUES ('12', 'oweweng', '123456', '0', '326c7fa3ef7a2aac2044f7bd3b82fdf1', 'owen', 'net', '1553237916707');
INSERT INTO `user` VALUES ('13', 'larr.liu', '123456', '0', '0b8b778c00174b4195fc4d4fc9fbf148', 'larr', 'net', '1551423277985');
INSERT INTO `user` VALUES ('14', 'Vio.du', '123456', '0', '8cbcdbca416cb2190fcdc86f76f1036c', 'Vit', 'net', '1552275562281');
INSERT INTO `user` VALUES ('15', 'hyay.wu', '123456', '0', '179f218e1ffc5b844cbe0221f3f7181a', 'hyw', 'net', '1551423250684');
INSERT INTO `user` VALUES ('16', 'oe.lai', '123456', '0', 'f3ac6ea85385074b92f432b916854115', 'jo', 'net', '1551426169562');
INSERT INTO `user` VALUES ('17', 'l.li', '123456', '0', '95c820c84582c66dc017be24c26ff535', 'l', 'net', '1553853860317');
INSERT INTO `user` VALUES ('18', 'Elie.li', '123456', '0', '6573b483be43eafc6a8301fccdf4ec9a', 'Elai', 'net', '1551685100151');

-- ----------------------------
-- Table structure for `vote`
-- ----------------------------
DROP TABLE IF EXISTS `vote`;
CREATE TABLE `vote` (
  `vid` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL DEFAULT '0',
  `author_id` int(11) NOT NULL DEFAULT '0',
  `sid` int(11) DEFAULT '0',
  `comment` text,
  `uid` int(11) NOT NULL DEFAULT '0',
  `create_date` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`vid`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COMMENT='Voting record';

-- ----------------------------
-- Records of vote
-- ----------------------------
INSERT INTO `vote` VALUES ('22', '18', '5', '25', null, '7', '1551426009816');
INSERT INTO `vote` VALUES ('23', '18', '16', '29', null, '13', '1552273984998');
INSERT INTO `vote` VALUES ('24', '18', '16', '29', null, '17', '1552275516005');
INSERT INTO `vote` VALUES ('25', '18', '3', '32', null, '1', '1552377242425');
INSERT INTO `vote` VALUES ('26', '18', '16', '29', null, '15', '1552383448991');
INSERT INTO `vote` VALUES ('27', '18', '17', '38', null, '8', '1554169117964');
