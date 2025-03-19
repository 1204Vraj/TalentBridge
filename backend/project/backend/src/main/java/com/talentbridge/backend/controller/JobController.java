package com.talentbridge.backend.controller;

import com.talentbridge.backend.model.Job;
import com.talentbridge.backend.model.JobApplication;
import com.talentbridge.backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {
    
    private final JobService jobService;

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJob(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody Job job) {
        return ResponseEntity.ok(jobService.createJob(job));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestBody Job job) {
        return ResponseEntity.ok(jobService.updateJob(id, job));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/applications")
    public ResponseEntity<List<JobApplication>> getJobApplications(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobApplications(id));
    }

    @PostMapping("/{id}/applications")
    public ResponseEntity<JobApplication> applyForJob(
            @PathVariable Long id,
            @RequestParam Long userId) {
        return ResponseEntity.ok(jobService.applyForJob(id, userId));
    }
}