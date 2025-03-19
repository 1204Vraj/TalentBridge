package com.talentbridge.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "company_profiles")
public class CompanyProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String location;
    private String industry;
    private String logoUrl;
    private String website;
}