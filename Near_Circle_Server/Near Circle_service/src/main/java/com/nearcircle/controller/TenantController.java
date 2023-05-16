package com.nearcircle.controller;

import com.nearcircle.dto.*;
import com.nearcircle.responce.GeneralResponse;
import com.nearcircle.services.tenant.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;

@RestController
@RequestMapping("/api/near-circle/tenant/")
public class TenantController {

    @Autowired
    private TenantService tenantService;

    @PostMapping("")
    public GeneralResponse postTenant(@RequestBody SecondTenantDto secondTenantDto) {
        GeneralResponse response = new GeneralResponse();
        try {
            return tenantService.postTenant(secondTenantDto);
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @PostMapping("pic")
    public GeneralResponse postTenantPic(ImageDto imageDto) {
        GeneralResponse response = new GeneralResponse();
        System.out.println("in pic");
        try {
            return tenantService.postTenantPic(imageDto);
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }


    @GetMapping("apartments")
    public GeneralResponse getAllApartment() {
        GeneralResponse response = new GeneralResponse();
        try {
            response.setData(tenantService.getAllApartment());
            response.setStatus(HttpStatus.OK);
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @PostMapping("search")
    public GeneralResponse searchTenant(@RequestBody SearchTenant searchTenant) {
        GeneralResponse response = new GeneralResponse();
        try {
            response.setData(tenantService.searchTenant(searchTenant));
            response.setStatus(HttpStatus.OK);
            response.setMessage("Students fetched successfully!");
            return response;
        } catch (Exception e) {
            response.setMessage("Something went wrong!");
            response.setStatus(HttpStatus.BAD_REQUEST);
            return response;
        }
    }

    @PostMapping("friend")
    public GeneralResponse addTenantToFriendList(@RequestBody FriendsDto friendsDto) {
        GeneralResponse response = new GeneralResponse();
        if (tenantService.findByTenantIdAndUserId(friendsDto.getTenantId(), friendsDto.getUserId())) {
            response.setStatus(HttpStatus.NOT_ACCEPTABLE);
            response.setMessage("Already in Friend List!");
            return response;
        }
        FriendsDto addTenantIntoFriendList = tenantService.addTenantToFriendList(friendsDto);
        if (addTenantIntoFriendList == null) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Something went wrong!");
            return response;
        }
        response.setStatus(HttpStatus.CREATED);
        response.setMessage("Tenant Added into Friend List successfully!");
        return response;
    }

    @GetMapping("friends/{userId}")
    public GeneralResponse getFriendsByUserId(@PathVariable Long userId) {
        GeneralResponse response = new GeneralResponse();
        try {
            response.setData(tenantService.getFriendsByUserId(userId));
            response.setStatus(HttpStatus.OK);
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @GetMapping("user/{userId}")
    public GeneralResponse getTenantByUserId(@PathVariable Long userId) {
        GeneralResponse response = new GeneralResponse();
        try {
            response.setData(tenantService.getTenantByUserId(userId));
            response.setMessage("Tenant id Fetched successfully.");
            response.setStatus(HttpStatus.OK);
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @GetMapping("pic/{userId}")
    public GeneralResponse getTenantProfilePic(@PathVariable Long userId) {
        GeneralResponse response = new GeneralResponse();
        try {
            response.setData(tenantService.getTenantProfilePicByUserId(userId));
            response.setMessage("Tenant pic Fetched successfully.");
            response.setStatus(HttpStatus.OK);
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @GetMapping("{apartmentId}")
    public GeneralResponse getTenantsByApartmentId(@PathVariable Long apartmentId) {
        GeneralResponse response = new GeneralResponse();
        try {
            response.setData(tenantService.getTenantsByApartmentId(apartmentId));
            response.setStatus(HttpStatus.OK);
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @GetMapping("{apartmentId}/{tenantId}")
    public GeneralResponse getTenantsByApartmentId(@PathVariable Long apartmentId, @PathVariable Long tenantId) {
        GeneralResponse response = new GeneralResponse();
        try {
            response.setData(tenantService.viewTenantsByApartmentId(apartmentId,tenantId));
            response.setStatus(HttpStatus.OK);
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @GetMapping("friend/{tenantId}")
    public GeneralResponse getTenantFriendByFriendId(@PathVariable Long tenantId) {
        GeneralResponse response = new GeneralResponse();
        try {
            response.setData(tenantService.getTenantFriendByFriendId(tenantId));
            response.setStatus(HttpStatus.OK);
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @PostMapping("post/{tenantId}")
    public GeneralResponse tenantPostSomething(@PathVariable Long tenantId, @RequestBody PostDto postDto) {
        GeneralResponse response = new GeneralResponse();
        try {
            return tenantService.tenantPostSomething(tenantId, postDto);
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @GetMapping("friends-count/{userId}")
    public GeneralResponse getFriendsCountByUserId(@PathVariable Long userId) {
        GeneralResponse response = new GeneralResponse();
        try {
            response.setData(tenantService.getFriendsCountByUserId(userId));
            response.setStatus(HttpStatus.OK);
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @GetMapping("posts/{tenantId}")
    public GeneralResponse getAllPosts(@PathVariable Long tenantId) {
        GeneralResponse response = new GeneralResponse();
        try {
            response.setData(tenantService.getAllPosts(tenantId));
            response.setStatus(HttpStatus.OK);
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

}
