package com.talentbridge.backend.controller;

import com.talentbridge.backend.model.CompanyProfile;
import com.talentbridge.backend.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyController {
    
    private final CompanyService companyService;

    @GetMapping("/{id}")
    public ResponseEntity<CompanyProfile> getCompanyProfile(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.getCompanyProfile(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompanyProfile> updateCompanyProfile(
            @PathVariable Long id,
            @RequestBody CompanyProfile profile) {
        return ResponseEntity.ok(companyService.updateCompanyProfile(id, profile));
    }
}