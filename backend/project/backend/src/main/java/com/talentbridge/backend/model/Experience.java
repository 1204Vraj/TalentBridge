package com.talentbridge.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "experiences")
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_profile_id")
    private UserProfile userProfile;

    private String company;
    private String position;
    private String startDate;
    private String endDate;
    
    @Column(columnDefinition = "TEXT")
    private String description;
}