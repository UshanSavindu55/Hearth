package com.hearth.backend.config;

import jakarta.validation.Validation;
import jakarta.validation.ValidatorFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

@Configuration
public class ValidationConfig {

    @Bean
    public jakarta.validation.Validator validator() {
        ValidatorFactory factory = Validation.byDefaultProvider()
                .configure()
                .addProperty("hibernate.validator.fail_fast", "true")
                .buildValidatorFactory();

        return factory.getValidator();
    }

    @Bean
    public org.springframework.validation.Validator springValidator() {
        LocalValidatorFactoryBean validatorFactoryBean = new LocalValidatorFactoryBean();
        validatorFactoryBean.getValidationPropertyMap()
                .put("hibernate.validator.fail_fast", "true");
        return validatorFactoryBean;
    }
}
