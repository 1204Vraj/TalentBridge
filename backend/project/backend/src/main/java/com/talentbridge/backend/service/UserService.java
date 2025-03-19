package com.talentbridge.backend.service;

import com.talentbridge.backend.model.User;
import com.talentbridge.backend.model.UserProfile;
import com.talentbridge.backend.repository.UserProfileRepository;
import com.talentbridge.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;

    public UserProfile getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getUserProfile();
    }

    public UserProfile updateUserProfile(Long userId, UserProfile profileDetails) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        UserProfile profile = user.getUserProfile();
        if (profile == null) {
            profile = new UserProfile();
            profile.setUser(user);
        }

        profile.setFullName(profileDetails.getFullName());
        profile.setTitle(profileDetails.getTitle());
        profile.setSkills(profileDetails.getSkills());
        profile.setExperiences(profileDetails.getExperiences());
        profile.setEducation(profileDetails.getEducation());
        profile.setCertifications(profileDetails.getCertifications());
        profile.setResumeUrl(profileDetails.getResumeUrl());
        profile.setProfilePicUrl(profileDetails.getProfilePicUrl());

        return userProfileRepository.save(profile);
    }
}