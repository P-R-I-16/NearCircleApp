package com.nearcircle.services.tenant;

import com.nearcircle.dto.*;
import com.nearcircle.entity.*;
import com.nearcircle.enums.Status;
import com.nearcircle.repo.*;
import com.nearcircle.responce.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Array;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class TenantServiceImpl implements TenantService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ApartmentRepo apartmentRepo;

    @Autowired
    private TenantRepo tenantRepo;

    @Autowired
    private FriendsRepo friendsRepo;

    @Autowired
    private PostsRepo postsRepo;

    @Autowired
    private ProfileImgRepo profileImgRepo;

    @Override
    public GeneralResponse postTenant(SecondTenantDto secondTenantDto) {
        GeneralResponse response = new GeneralResponse();
        Long apartmentId = Long.parseLong(secondTenantDto.getApartmentId());
        Optional<User> optionalUser = userRepo.findById(secondTenantDto.getUserId());
        Optional<Apartment> optionalApartment = apartmentRepo.findById(Long.valueOf(apartmentId));
        if (optionalUser.isPresent() && optionalApartment.isPresent()) {
            Tenant tenant = new Tenant();
            tenant.setFirstname(secondTenantDto.getFirstname());
            tenant.setLastname(secondTenantDto.getLastname());
            tenant.setAddress(secondTenantDto.getAddress());
            tenant.setAge(secondTenantDto.getAge());
            tenant.setBio(secondTenantDto.getBio());
            tenant.setInterests(secondTenantDto.getInterests());
            tenant.setRace(secondTenantDto.getRace());
            tenant.setEthnicity(secondTenantDto.getEthnicity());
            tenant.setNationality(secondTenantDto.getNationality());
            tenant.setMobile(secondTenantDto.getMobile());
            tenant.setDate(new Date());
            tenant.setApartment(optionalApartment.get());
            tenant.setStatus(Status.PENDING);
            tenant.setManagerId(optionalApartment.get().getUser().getId());
            tenant.setUser(optionalUser.get());
            tenantRepo.save(tenant);
            response.setMessage("Tenant posted Successfully");
            response.setStatus(HttpStatus.CREATED);
        } else {
            response.setStatus(HttpStatus.NOT_ACCEPTABLE);
            response.setMessage("Apartment or User not found!");
        }
        return response;
    }

    @Override
    public GeneralResponse postTenantPic(ImageDto imageDto) throws IOException {
        System.out.println("hello2"+imageDto.getUserId());
        GeneralResponse response = new GeneralResponse();

        Optional<User> optionalUser = userRepo.findById(imageDto.getUserId());
        if(optionalUser.isPresent()) {
            System.out.println("hello1");
            ProfileImg profileImg = new ProfileImg();
            profileImg.setUser(optionalUser.get());
            profileImg.setImg(imageDto.getImg().getBytes());
            //profileImg.setImg(imageDto.getBlob());
            System.out.println("hello");
            Object file = imageDto.getImg();
            profileImgRepo.save(profileImg);
            response.setMessage("Tenant Profile pic uploaded Successfully");
            response.setStatus(HttpStatus.CREATED);
            return response;
        }
        else{
            response.setStatus(HttpStatus.NOT_ACCEPTABLE);
            response.setMessage("User not found!");
            return response;
        }
    }

    @Override
    public List<ApartmentDto> getAllApartment() {
        return apartmentRepo.findAllByStatus(Status.APPROVED).stream().map(Apartment::getApartmentDto).collect(Collectors.toList());
    }

    @Override
    public TenantsResponseDto searchTenant(SearchTenant searchTenant) {
        Tenant tenant = new Tenant();
        tenant.setNationality(searchTenant.getNationality());
        tenant.setAge(searchTenant.getAge());
        tenant.setInterests(searchTenant.getInterests());
        tenant.setStatus(Status.APPROVED);
        ExampleMatcher customExampleMatcher = ExampleMatcher.matchingAll().withMatcher("nationality", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase()).withMatcher("age", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase()).withMatcher("interests", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase()).withMatcher("status", ExampleMatcher.GenericPropertyMatchers.exact().ignoreCase());
        Example<Tenant> tenantExample = Example.of(tenant, customExampleMatcher);
        List<Tenant> tenantList = tenantRepo.findAll(tenantExample);
        TenantsResponseDto tenantsResponseDto = new TenantsResponseDto();
        tenantsResponseDto.setTenantDtoList(tenantList.stream().map(Tenant::getTenantDto).collect(Collectors.toList()));
        return tenantsResponseDto;
    }

    @Override
    public FriendsDto addTenantToFriendList(FriendsDto friendsDto) {
        Optional<User> optionalUser = userRepo.findById(friendsDto.getUserId());
        Optional<Tenant> optionalTenant = tenantRepo.findById(friendsDto.getTenantId());
        Tenant optionalTenant2=tenantRepo.findAllByUserId(friendsDto.getUserId());
        Optional<User> optionalUser2 = userRepo.findById(friendsDto.getTenantUserId());
        //Optional<Tenant> optionalTenant2= tenantRepo.findById(optionalTenant.get().getId());
        if (optionalUser.isPresent() && optionalTenant.isPresent()) {
            Friends friends = new Friends();
            User user = optionalTenant.get().getUser();
            friends.setUser(optionalUser.get());
            friends.setTenant(optionalTenant.get());
            user.setCountFriends(user.getCountFriends() + 1);
            friendsRepo.save(friends);
            userRepo.save(user);

            Friends friends1 = new Friends();
            User user1 = optionalTenant2.getUser();
            friends1.setUser(optionalUser2.get());
            friends1.setTenant(optionalTenant2);
            user1.setCountFriends(user1.getCountFriends() + 1);
            friendsRepo.save(friends1);
            userRepo.save(user1);
        }
        return friendsDto;
    }

    @Override
    public List<FriendsDto> getFriendsByUserId(Long userId) {
        return friendsRepo.findAllByUserId(userId).stream().map(Friends::getFriendsDto).collect(Collectors.toList());
    }

    @Override
    public TenantDto getTenantByUserId(Long userId) {
        TenantDto tenantDto = null;
        Optional<Tenant> optionalTenant = tenantRepo.findByUserId(userId);
        if (optionalTenant.isPresent()) {
            tenantDto = optionalTenant.get().getTenantDto();
        }
        return tenantDto;
    }

    @Override
    public ImageDto getTenantProfilePicByUserId(Long userId) {
        ImageDto imageDto=null;
        Optional<ProfileImg> optionalTenant = profileImgRepo.findByUserId(userId);
        if (optionalTenant.isPresent()) {
            imageDto = optionalTenant.get().getImageDto();
        }
        return imageDto;
    }

    @Override
    public boolean findByTenantIdAndUserId(Long tenantId, Long userId) {
        return friendsRepo.findByTenantIdAndUserId(tenantId, userId) != null;
    }

    @Override
    public List<TenantDto> getTenantsByApartmentId(Long apartmentId) {
        List<TenantDto> tenantList= tenantRepo.findAllByApartmentIdAndStatus(apartmentId, Status.APPROVED).stream().map(Tenant::getTenantDto).collect(Collectors.toList());
        return tenantList;

    }


    @Override
    public List<TenantDto> viewTenantsByApartmentId(Long apartmentId, Long tenantId) {
        List<TenantDto> tenantList= tenantRepo.findAllByApartmentIdAndStatus(apartmentId, Status.APPROVED).stream().map(Tenant::getTenantDto).collect(Collectors.toList());
        for (TenantDto e:tenantList){
            if( e.getId().equals(tenantId)){
                tenantList.remove(e);
            }
        }
        return tenantList;

    }
    @Override
    public TenantDto getTenantFriendByFriendId(Long tenantId) {
        TenantDto tenantDto = null;
        Optional<Tenant> optionalTenant = tenantRepo.findById(tenantId);
        if (optionalTenant.isPresent()) {
            tenantDto = optionalTenant.get().getTenantDto();
        }
        return tenantDto;
    }

    @Override
    public GeneralResponse tenantPostSomething(Long tenantId, PostDto postDto) {
        GeneralResponse response = new GeneralResponse();
        Optional<Tenant> optionalTenant = tenantRepo.findById(tenantId);
        if (optionalTenant.isPresent()) {
            Posts post = new Posts();
            post.setText(postDto.getText());
            post.setUser(optionalTenant.get().getUser());
            post.setTenant(optionalTenant.get());
            post.setDate(new Date());
            postsRepo.save(post);
            response.setMessage("Post posted Successfully");
            response.setStatus(HttpStatus.CREATED);
        } else {
            response.setStatus(HttpStatus.NOT_ACCEPTABLE);
            response.setMessage("Tenant or User not found!");
        }
        return response;
    }

    @Override
    public UserDto getFriendsCountByUserId(Long userId) {
        Optional<User> optionalUser = userRepo.findById(userId);
        UserDto userDto = optionalUser.get().getUserDto();
        return userDto;
    }

    @Override
    public List<PostDto> getAllPosts(Long tenantId) {
        List<PostDto> userPosts=postsRepo.findAllByTenantId(tenantId).stream().map(Posts::getPostDto).collect(Collectors.toList());
       List<Friends> friends=friendsRepo.findAllByTenantId(tenantId);
        List<PostDto> friendPosts=new ArrayList<>();
for(Friends e:friends){
    friendPosts=postsRepo.findAllByUserId(e.getUser().getId()).stream().map(Posts::getPostDto).collect(Collectors.toList());
}
       // List<PostDto> friendPosts=postsRepo.findAllByUserId(friends).stream().map(Posts::getPostDto).collect(Collectors.toList());
     return   Stream.of(userPosts, friendPosts)
                .flatMap(x -> x.stream())
                .collect(Collectors.toList());

        //return postsRepo.findAllByTenantId(tenantId).stream().map(Posts::getPostDto).collect(Collectors.toList());

    }

}
