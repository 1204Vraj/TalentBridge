package com.talentbridge.backend.service;

import com.talentbridge.backend.model.CompanyProfile;
import com.talentbridge.backend.model.User;
import com.talentbridge.backend.repository.CompanyProfileRepository;
import com.talentbridge.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyService {
    
    private final UserRepository userRepository;
    private final CompanyProfileRepository companyProfileRepository;

    public CompanyProfile getCompanyProfile(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getCompanyProfile();
    }

    public CompanyProfile updateCompanyProfile(Long userId, CompanyProfile profileDetails) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        CompanyProfile profile = user.getCompanyProfile();
        if (profile == null) {
            profile = new CompanyProfile();
            profile.setUser(user);
        }

        profile.setName(profileDetails.getName());
        profile.setDescription(profileDetails.getDescription());
        profile.setLocation(profileDetails.getLocation());
        profile.setIndustry(profileDetails.getIndustry());
        profile.setLogoUrl(profileDetails.getLogoUrl());
        profile.setWebsite(profileDetails.getWebsite());

        return companyProfileRepository.save(profile);
    }
}