package com.nearcircle.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nearcircle.dto.TenantDto;
import com.nearcircle.enums.Status;
import com.nearcircle.utill.JSONObjectConverter;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstname;

    private String lastname;

    private String address;

    private String age;

    private String bio;

    private String mobile;


    private String interests;

    private String race;

    private String ethnicity;

    private String nationality;

    private Date date;

    private Status status;

    private Long managerId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "apartment_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Apartment apartment;

    public TenantDto getTenantDto() {
        TenantDto tenantDto = new TenantDto();
        tenantDto.setId(id);
        tenantDto.setFirstname(firstname);
        tenantDto.setLastname(lastname);
        tenantDto.setAddress(address);
        tenantDto.setAge(age);
        tenantDto.setBio(bio);
        tenantDto.setRace(race);
        tenantDto.setInterests(interests);
        tenantDto.setEthnicity(ethnicity);
        tenantDto.setNationality(nationality);
        tenantDto.setDate(date);
        tenantDto.setStatus(status);
        tenantDto.setManagerId(managerId);
        tenantDto.setApartmentId(apartment.getId());
        tenantDto.setApartmentName(apartment.getName());
        tenantDto.setUserId(user.getId());
        tenantDto.setUsername(user.getName());
        tenantDto.setMobile(mobile);
        return tenantDto;
    }

}
