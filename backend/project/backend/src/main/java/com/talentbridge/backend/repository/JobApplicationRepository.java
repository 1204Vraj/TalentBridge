package com.talentbridge.backend.repository;

import com.talentbridge.backend.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByJobId(Long jobId);
    List<JobApplication> findByApplicantId(Long applicantId);
    boolean existsByJobIdAndApplicantId(Long jobId, Long applicantId);
}