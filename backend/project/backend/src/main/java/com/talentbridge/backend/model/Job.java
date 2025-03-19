package com.talentbridge.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private CompanyProfile company;

    private String title;
    private String location;
    private String type;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @ElementCollection
    @CollectionTable(name = "job_requirements")
    @Column(name = "requirement")
    private List<String> requirements = new ArrayList<>();
    
    private LocalDateTime postedDate;
    private LocalDateTime deadline;
    
    @Enumerated(EnumType.STRING)
    private JobStatus status;

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL)
    private List<JobApplication> applications = new ArrayList<>();

    public enum JobStatus {
        OPEN, CLOSED
    }
}