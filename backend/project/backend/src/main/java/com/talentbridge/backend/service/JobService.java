package com.talentbridge.backend.service;

import com.talentbridge.backend.model.Job;
import com.talentbridge.backend.model.JobApplication;
import com.talentbridge.backend.model.User;
import com.talentbridge.backend.model.UserProfile;
import com.talentbridge.backend.repository.JobApplicationRepository;
import com.talentbridge.backend.repository.JobRepository;
import com.talentbridge.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {
    
    private final JobRepository jobRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Job not found"));
    }

    public Job createJob(Job job) {
        job.setPostedDate(LocalDateTime.now());
        job.setStatus(Job.JobStatus.OPEN);
        return jobRepository.save(job);
    }

    public Job updateJob(Long id, Job jobDetails) {
        Job job = getJobById(id);
        job.setTitle(jobDetails.getTitle());
        job.setDescription(jobDetails.getDescription());
        job.setLocation(jobDetails.getLocation());
        job.setType(jobDetails.getType());
        job.setRequirements(jobDetails.getRequirements());
        job.setDeadline(jobDetails.getDeadline());
        job.setStatus(jobDetails.getStatus());
        return jobRepository.save(job);
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }

    public List<JobApplication> getJobApplications(Long jobId) {
        return jobApplicationRepository.findByJobId(jobId);
    }

    public JobApplication applyForJob(Long jobId, Long userId) {
        Job job = getJobById(jobId);
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (job.getStatus() != Job.JobStatus.OPEN) {
            throw new RuntimeException("This job is not accepting applications");
        }

        if (jobApplicationRepository.existsByJobIdAndApplicantId(jobId, userId)) {
            throw new RuntimeException("You have already applied for this job");
        }

        JobApplication application = new JobApplication();
        application.setJob(job);
        application.setApplicant(user.getUserProfile());
        application.setStatus(JobApplication.ApplicationStatus.PENDING);
        application.setAppliedDate(LocalDateTime.now());

        return jobApplicationRepository.save(application);
    }
}