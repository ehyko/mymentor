package com.hc.mymentor.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link CareerStoneSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class CareerStoneSearchRepositoryMockConfiguration {

    @MockBean
    private CareerStoneSearchRepository mockCareerStoneSearchRepository;

}
