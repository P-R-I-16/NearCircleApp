package com.nearcircle.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nearcircle.dto.ApartmentDto;
import com.nearcircle.dto.ImageDto;
import com.nearcircle.enums.Status;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.persistence.*;
import java.sql.Blob;
import java.util.Date;

@Entity
@Data
public class ProfileImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private byte[] img;

    @Lob
    private Blob blobImg;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    public ImageDto getImageDto() {
        ImageDto imageDto = new ImageDto();
        imageDto.setId(id);
        imageDto.setUserId(user.getId());
        imageDto.setFile(img);
        return imageDto;
    }

}
