package com.tmo.spring.repository;

import com.tmo.spring.domain.Feature_title;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface Feature_titleRepository extends JpaRepository<Feature_title, Long> {
    Feature_title findByName(String name);

    @Query("select ft.id from Feature_title ft join ft.feature_vals fv")
    Integer[] getIds();

    @Modifying
    @Transactional
    @Query("delete from Feature_title ft where ft.id not in ?1")
    void deleteFeatureByIds(Integer[] ids);
}
