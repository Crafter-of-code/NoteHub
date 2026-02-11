package com.note.services;

import com.note.model.WelcomeData;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class WelcomeService {
    String[] title = {"\uD83D\uDCDD Create & Edit","\uD83D\uDD10 Secure Access","⚡ Fast & Reliable"};
    String[] description = {"Add, update, and delete notes easily with a distraction-free editor.",
            "Sign up and log in securely to keep your notes private and protected.",
            "Optimized for speed so your notes are always just one click away."};
    public List<WelcomeData> getListData(){
        List<WelcomeData> li = new ArrayList<WelcomeData>();
        for (int i = 0;i<title.length;i++){
            WelcomeData wlcData = new WelcomeData();
            wlcData.setTitle(title[i]);
           wlcData.setDescription(description[i]);
            li.add(wlcData);
        }
        return  li;
    }
}
