package com.tmo.spring.repository;

import com.tmo.spring.domain.Thing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Repository
@Transactional
public interface ThingRepository extends JpaRepository<Thing, Long> {
    Thing findById(int id);

    Long deleteById(int id);

    @Query("select t from Thing t join t.categories c  where c.leftNode >= ?2 AND c.rightNode <= ?1")
    Set<Thing> thingsByCategory(int right, int left);

    @Query("select t from Thing t join t.categories c join t.feature_vals fv join fv.feature_title ft where c.leftNode >= ?2 AND c.rightNode <= ?1 AND fv.value in ?4 AND ft.name in ?3 group by t.id having count(t)=?5")
    Set<Thing> findCatFeature(int right, int left, String[] name, String[] value, long count);

}

