package com.hc.mymentor.repository.search;
import com.hc.mymentor.domain.Company;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Company} entity.
 */
public interface CompanySearchRepository extends ElasticsearchRepository<Company, Long> {
}
