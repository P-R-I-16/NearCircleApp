package com.nearcircle.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nearcircle.dto.PostDto;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class Posts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    private Date date;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tenant_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Tenant tenant;

    public PostDto getPostDto() {
        PostDto postDto = new PostDto();
        postDto.setId(id);
        postDto.setText(text);
        postDto.setUserId(user.getId());
        postDto.setTenantId(tenant.getId());
        postDto.setDate(date);
        postDto.setTenantFirstName(tenant.getFirstname());
        postDto.setTenantLastName(tenant.getLastname());
        return postDto;
    }

}
