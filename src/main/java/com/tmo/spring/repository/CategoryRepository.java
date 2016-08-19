package com.tmo.spring.repository;

import com.tmo.spring.domain.Thing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tmo.spring.domain.Thing;
import com.tmo.spring.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Set;

@Repository
@Transactional
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Set<Category> findAllByOrderByLeftNodeAsc();

    Category findById(int id);

    //@Query("select distinct ft.name, fv.value from Category c join c.feature_titles ft join ft.feature_vals fv where c.leftNode >= ?2 AND c.rightNode <= ?1")
    @Query("select distinct ft.name, fv.value from Category c join c.feature_titles ft join ft.feature_vals fv join fv.thing t join t.categories cs where c.leftNode >= ?2 AND c.rightNode <= ?1 AND cs.leftNode >= ?2 AND cs.rightNode <= ?1 AND fv.count is null")
    Set<?> featureByCategory(int right, int left);

    @Modifying(clearAutomatically = true)
    @Query("update Category c set c.leftNode = c.leftNode + 2, c.rightNode = c.rightNode + 2 where c.leftNode > ?1")
    void updateKey(int right);

    @Modifying(clearAutomatically = true)
    @Query("update Category c set c.rightNode = c.rightNode + 2 where c.rightNode >= ?1 AND c.leftNode < ?1")
    void updateNode(int right);

    @Modifying(clearAutomatically = true)
    @Query("update Category c set c.rightNode = c.rightNode - (?1 - ?2 + 1) where c.rightNode > ?1 AND c.leftNode < ?2")
    void updateParentNode(int right, int left);

    @Modifying(clearAutomatically = true)
    @Query("update Category c set c.leftNode = c.leftNode - (?1 - ?2 + 1), c.rightNode = c.rightNode - (?1 - ?2 + 1) where c.leftNode > ?1")
    void updateLastNode(int right, int left);

    @Modifying
    @Transactional
    @Query("delete from Category c where c.leftNode >= ?2 and c.rightNode <= ?1")
    void deleteNode(int right, int left);
}