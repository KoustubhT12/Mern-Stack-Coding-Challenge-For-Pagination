package com.example.endpoint.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class ProductController {

    @CrossOrigin(origins = "*")
    @GetMapping("/api/pros")
    public ResponseEntity<String> getPros(){
    	// url to fetch data 
    	String url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";
    	
    	RestTemplate rtemp = new RestTemplate();
    	String response = rtemp.getForObject(url, String.class);
    	return ResponseEntity.ok(response);
    }
	
}
