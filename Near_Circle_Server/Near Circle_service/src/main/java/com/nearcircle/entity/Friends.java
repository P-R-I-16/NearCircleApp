package com.nearcircle.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nearcircle.dto.FriendsDto;
import com.nearcircle.dto.TenantDto;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Data
public class Friends {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tenant_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Tenant tenant;

    public FriendsDto getFriendsDto() {
        FriendsDto friendsDto = new FriendsDto();
        friendsDto.setId(id);
        friendsDto.setUserId(user.getId());
        friendsDto.setTenantId(tenant.getId());
        friendsDto.setTenantFirstName(tenant.getFirstname());
        friendsDto.setTenantLastName(tenant.getLastname());
        return friendsDto;
    }

}
