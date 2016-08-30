package com.tmo.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tmo.spring.domain.Category;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Set;

@Repository
@Transactional
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Set<Category> findAllByOrderByLeftNodeAsc();

    Category findById(Integer id);

    @Query("select distinct ft.name, fv.value from Category c join c.feature_titles ft join ft.feature_vals fv join fv.thing t join t.categories cs where c.leftNode >= ?2 AND c.rightNode <= ?1 AND cs.leftNode >= ?2 AND cs.rightNode <= ?1 AND fv.count is null")
    Set<?> featureByCategory(Integer right, Integer left);

    @Modifying(clearAutomatically = true)
    @Query("update Category c set c.leftNode = c.leftNode + 2, c.rightNode = c.rightNode + 2 where c.leftNode > ?1")
    void updateKey(Integer right);

    @Modifying(clearAutomatically = true)
    @Query("update Category c set c.rightNode = c.rightNode + 2 where c.rightNode >= ?1 AND c.leftNode < ?1")
    void updateNode(Integer right);

    @Modifying(clearAutomatically = true)
    @Query("update Category c set c.rightNode = c.rightNode - (?1 - ?2 + 1) where c.rightNode > ?1 AND c.leftNode < ?2")
    void updateParentNode(Integer right, Integer left);

    @Modifying(clearAutomatically = true)
    @Query("update Category c set c.leftNode = c.leftNode - (?1 - ?2 + 1), c.rightNode = c.rightNode - (?1 - ?2 + 1) where c.leftNode > ?1")
    void updateLastNode(Integer right, Integer left);

    @Modifying
    @Transactional
    @Query("delete from Category c where c.leftNode >= ?2 and c.rightNode <= ?1")
    void deleteNode(Integer right, Integer left);
}