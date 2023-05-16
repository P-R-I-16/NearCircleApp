package com.nearcircle.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nearcircle.dto.ApartmentDto;
import com.nearcircle.enums.Status;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class Apartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    private Date date;

    private Status status;

    private String phoneNo;

    private String managerName;

    private String city;

    private String state;

    private String country;

    @Lob
    private byte[] img;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    public ApartmentDto getApartmentDto() {
        ApartmentDto apartmentDto = new ApartmentDto();
        apartmentDto.setId(id);
        apartmentDto.setName(name);
        apartmentDto.setAddress(address);
        apartmentDto.setManagerName(managerName);
        apartmentDto.setPhoneNo(phoneNo);
        apartmentDto.setCity(city);
        apartmentDto.setState(state);
        apartmentDto.setCountry(country);
        apartmentDto.setDate(date);
        apartmentDto.setStatus(status);
        apartmentDto.setUserId(user.getId());
        apartmentDto.setUsername(user.getName());
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/near-circle/admin/file/").path(apartmentDto.getId().toString()).toUriString();
        apartmentDto.setReturnedFile(fileDownloadUri);
        return apartmentDto;
    }

}
