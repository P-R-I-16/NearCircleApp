package com.nearcircle.services.tenant;

import com.nearcircle.dto.*;
import com.nearcircle.entity.ProfileImg;
import com.nearcircle.responce.GeneralResponse;

import java.io.IOException;
import java.util.List;

public interface TenantService {
    GeneralResponse postTenant(SecondTenantDto secondTenantDto);
    GeneralResponse postTenantPic(ImageDto imageDto) throws IOException;

    List<ApartmentDto> getAllApartment();

    TenantsResponseDto searchTenant(SearchTenant searchTenant);

    FriendsDto addTenantToFriendList(FriendsDto friendsDto);

    List<FriendsDto> getFriendsByUserId(Long userId);

    TenantDto getTenantByUserId(Long userId);

    ImageDto getTenantProfilePicByUserId(Long userId);

    boolean findByTenantIdAndUserId(Long tenantId, Long userId);

    List<TenantDto> getTenantsByApartmentId(Long apartmentId);

    List<TenantDto> viewTenantsByApartmentId(Long apartmentId,Long tenantId);



    TenantDto getTenantFriendByFriendId(Long tenantId);

    GeneralResponse tenantPostSomething(Long tenantId, PostDto tenantPostDto);

    UserDto getFriendsCountByUserId(Long userId);

    List<PostDto> getAllPosts(Long tenantId);
}
