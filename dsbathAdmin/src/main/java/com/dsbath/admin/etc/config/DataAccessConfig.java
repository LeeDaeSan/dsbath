package com.dsbath.admin.etc.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

@Configuration
@MapperScan(basePackages = "com.dsbath.admin.model.mapper")
public class DataAccessConfig {

	@Bean
	public SqlSessionFactory sqlSessionFactory (DataSource dataSource) throws Exception {
		SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
		
		// data source 설정
		sessionFactory.setDataSource(dataSource);
		// type alias 설정
		sessionFactory.setTypeAliasesPackage("com.dsbath.admin.model");
		// mapper(xml) 위치 설정
		sessionFactory.setMapperLocations(
				new PathMatchingResourcePatternResolver().getResources("classpath:mappers/*.xml"));
		
		return sessionFactory.getObject();
	}
	
	@Bean
	public SqlSessionTemplate sqlSessionTemplate (SqlSessionFactory sqlSessionFactory) {
		return new SqlSessionTemplate(sqlSessionFactory);
	}
}
