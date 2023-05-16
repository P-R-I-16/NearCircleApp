package com.nearcircle.dto;

import com.nearcircle.utill.JSONObjectConverter;
import lombok.Data;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.persistence.Convert;

@Data
public class SearchTenant {

    private String nationality;

    private String age;

    private String interests;

}
