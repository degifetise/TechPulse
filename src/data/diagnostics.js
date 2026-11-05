// Data-driven troubleshooting. Add an issue by adding one object to ISSUES.
// Wrap commands in backticks and they render as inline code.
export const PLATFORMS = [
  "pc",
  "mac",
  "mobile",
  "net"
];

export const ISSUES = [
  {
    "id": "disk",
    "p": "pc",
    "title": {
      "en": "100% disk usage",
      "amh": "ዲስክ 100% ሞልቷል"
    },
    "steps": {
      "en": [
        "Open Task Manager (`Ctrl+Shift+Esc`) and sort by Disk to find the heavy process.",
        "Pause Windows Search: run `services.msc` and temporarily disable Windows Search.",
        "Schedule a disk check with `chkdsk C: /f` and restart.",
        "If the drive is a hard disk, check its SMART health and consider an SSD."
      ],
      "amh": [
        "ተግባር አስተዳዳሪን (`Ctrl+Shift+Esc`) ከፍተው በዲስክ ደርድረው ብዙ የሚጠቀመውን ፕሮግራም ያግኙ።",
        "`services.msc` ከፍተው Windows Search ን ለጊዜው ያቁሙ።",
        "`chkdsk C: /f` በማሄድ ዲስኩን ለመፈተሽ ቀጠሮ ያስይዙና ዳግም ያስነሱ።",
        "ዲስኩ ሃርድ ዲስክ ከሆነ ጤናውን ይፈትሹ፤ ወደ SSD መቀየር ያስቡ።"
      ]
    }
  },
  {
    "id": "dns",
    "p": "pc",
    "title": {
      "en": "Pages will not load (DNS)",
      "amh": "ድረ-ገጾች አይከፈቱም (DNS)"
    },
    "steps": {
      "en": [
        "Open Command Prompt as administrator.",
        "Run `ipconfig /flushdns` to clear the DNS cache.",
        "Set DNS servers to `8.8.8.8` and `1.1.1.1` in the adapter settings.",
        "Run `netsh winsock reset`, then restart the PC."
      ],
      "amh": [
        "ኮማንድ ፕሮምፕትን በአስተዳዳሪነት ይክፈቱ።",
        "የDNS መሸጎጫን ለማጽዳት `ipconfig /flushdns` ያሂዱ።",
        "በአዳፕተር ቅንብር ውስጥ DNS ን ወደ `8.8.8.8` እና `1.1.1.1` ይቀይሩ።",
        "`netsh winsock reset` ያሂዱና ኮምፒውተሩን ዳግም ያስነሱ።"
      ]
    }
  },
  {
    "id": "slowboot",
    "p": "pc",
    "title": {
      "en": "Slow startup",
      "amh": "ኮምፒውተሩ ቀስ ብሎ ይነሳል"
    },
    "steps": {
      "en": [
        "Open Task Manager, go to Startup and disable apps you do not need at login.",
        "Run `sfc /scannow` to repair system files.",
        "Free at least 15% of the system drive.",
        "Turn off Fast Startup if boots hang after updates."
      ],
      "amh": [
        "ተግባር አስተዳዳሪ ውስጥ Startup ን ከፍተው አላስፈላጊ ፕሮግራሞችን ያጥፉ።",
        "የሲስተም ፋይሎችን ለመጠገን `sfc /scannow` ያሂዱ።",
        "የሲስተም ድራይቭ ቢያንስ 15% ባዶ ያድርጉ።",
        "ከዝማኔ በኋላ ከተሰቀለ Fast Startup ን ያጥፉ።"
      ]
    }
  },
  {
    "id": "macslow",
    "p": "mac",
    "title": {
      "en": "Slow after an update",
      "amh": "ከዝማኔ በኋላ ቀርፋፋ"
    },
    "steps": {
      "en": [
        "Open Activity Monitor and sort by CPU to find runaway apps.",
        "Wait 24 hours after a major update. Spotlight re-indexes in the background.",
        "On Intel Macs, restart and hold Option+Command+P+R for 20 seconds to reset NVRAM.",
        "Check free storage in About This Mac and keep 10 GB or more free."
      ],
      "amh": [
        "Activity Monitor ከፍተው በCPU ደርድረው የሚጭኑ ፕሮግራሞችን ያግኙ።",
        "ከትልቅ ዝማኔ በኋላ 24 ሰዓት ይጠብቁ። Spotlight ከጀርባ እንደገና ያመላክታል።",
        "በIntel ማክ ላይ ዳግም አስነስተው Option+Command+P+R ለ20 ሰከንድ ይያዙ (NVRAM ዳግም ማስጀመር)።",
        "በAbout This Mac ነፃ ቦታ ይመልከቱ፤ ቢያንስ 10 ጂቢ ያቆዩ።"
      ]
    }
  },
  {
    "id": "macwifi",
    "p": "mac",
    "title": {
      "en": "Wi-Fi keeps dropping",
      "amh": "ዋይፋይ ይቋረጣል"
    },
    "steps": {
      "en": [
        "In System Settings, open Wi-Fi, forget the network and join it again.",
        "Restart the router and wait two minutes before reconnecting.",
        "Create a new Location in the Network settings.",
        "Try the 5 GHz band if 2.4 GHz is crowded."
      ],
      "amh": [
        "በSystem Settings ውስጥ Wi-Fi ን ከፍተው ኔትወርኩን ረስተው እንደገና ይገናኙ።",
        "ራውተሩን ዳግም አስነስተው ሁለት ደቂቃ ይጠብቁ።",
        "በNetwork ቅንብር አዲስ Location ይፍጠሩ።",
        "2.4 GHz ከተጨናነቀ 5 GHz ይሞክሩ።"
      ]
    }
  },
  {
    "id": "bootloop",
    "p": "mobile",
    "title": {
      "en": "Bootloop",
      "amh": "ስልኩ ደጋግሞ ይነሳል"
    },
    "steps": {
      "en": [
        "Charge to at least 50% before trying anything.",
        "Hold Power and Volume Down for 10 seconds to force a restart.",
        "Boot into recovery mode and choose Wipe cache partition.",
        "If it still loops, back up with `adb pull` if possible, then factory reset or bring it in."
      ],
      "amh": [
        "ከመሞከርዎ በፊት ቢያንስ 50% ይሙሉ።",
        "Power እና Volume Down ለ10 ሰከንድ ይያዙ።",
        "ወደ Recovery mode ገብተው Wipe cache partition ይምረጡ።",
        "ካልተፈታ ከተቻለ በ`adb pull` ምትኬ ያስቀምጡ፤ ከዚያ Factory reset ያድርጉ ወይም ያምጡት።"
      ]
    }
  },
  {
    "id": "frp",
    "p": "mobile",
    "title": {
      "en": "FRP lock after a reset",
      "amh": "ከሪሴት በኋላ FRP መቆለፊያ"
    },
    "steps": {
      "en": [
        "Confirm you can sign in with the Google account that was on the phone.",
        "If you forgot the password, recover it from another device at `accounts.google.com/signin/recovery`.",
        "After a password change, wait 24 hours. Google may hold new credentials.",
        "No access to the account? Bring the phone with proof of purchase. We only unlock phones with proof of ownership."
      ],
      "amh": [
        "በስልኩ ላይ የነበረውን የጉግል አካውንት መጠቀም እንደሚችሉ ያረጋግጡ።",
        "የይለፍ ቃል ከረሱ ከሌላ መሣሪያ በ`accounts.google.com/signin/recovery` ያስመልሱ።",
        "የይለፍ ቃል ከቀየሩ በኋላ 24 ሰዓት ይጠብቁ።",
        "አካውንቱን ማግኘት ካልቻሉ የግዢ ማረጋገጫ ይዘው ስልኩን ያምጡ። የባለቤትነት ማረጋገጫ ላላቸው ብቻ እንከፍታለን።"
      ]
    }
  },
  {
    "id": "battery",
    "p": "mobile",
    "title": {
      "en": "Battery drains fast",
      "amh": "ባትሪ በፍጥነት ይጨርሳል"
    },
    "steps": {
      "en": [
        "Open Settings, then Battery, and check which apps use the most power.",
        "Lower screen brightness and turn on adaptive battery.",
        "Restart in safe mode. If the drain stops, a third-party app is the cause.",
        "If battery health is below 80% or the phone is swelling, replace the battery."
      ],
      "amh": [
        "Settings ውስጥ Battery ን ከፍተው ብዙ ኃይል የሚጠቀሙ ፕሮግራሞችን ይመልከቱ።",
        "የስክሪን ብሩህነት ይቀንሱ፤ Adaptive battery ያብሩ።",
        "በSafe mode ያስነሱ። ከቆመ ሌላ ፕሮግራም ምክንያት ነው።",
        "የባትሪ ጤና ከ80% በታች ከሆነ ወይም ካበጠ ባትሪውን ይቀይሩ።"
      ]
    }
  },
  {
    "id": "nolink",
    "p": "net",
    "title": {
      "en": "No connectivity",
      "amh": "ግንኙነት የለም"
    },
    "steps": {
      "en": [
        "Check the cable and port LEDs. A dark LED means no link.",
        "On the switch run `show ip interface brief` and look for down.",
        "From a connected host, `ping` the default gateway.",
        "Check the DHCP pool with `show ip dhcp binding`."
      ],
      "amh": [
        "ገመዱንና የፖርት መብራቶችን ይፈትሹ። የጠፋ መብራት ግንኙነት የለም ማለት ነው።",
        "በስዊቹ ላይ `show ip interface brief` ያሂዱ፤ down ያለውን ይፈልጉ።",
        "ከተገናኘ ኮምፒውተር ወደ ጌትዌይ `ping` ያድርጉ።",
        "DHCP ፑሉን በ`show ip dhcp binding` ይፈትሹ።"
      ]
    }
  },
  {
    "id": "vlan",
    "p": "net",
    "title": {
      "en": "VLAN traffic blocked",
      "amh": "የVLAN ትራፊክ ታግዷል"
    },
    "steps": {
      "en": [
        "Run `show vlan brief` to confirm the port is in the right VLAN.",
        "Run `show interfaces trunk` and check the allowed VLAN list.",
        "Verify the native VLAN matches on both ends of the trunk.",
        "Check the router sub-interface has `encapsulation dot1Q` and the right IP."
      ],
      "amh": [
        "ፖርቱ በትክክለኛ VLAN ውስጥ መሆኑን ለማረጋገጥ `show vlan brief` ያሂዱ።",
        "`show interfaces trunk` ያሂዱና የተፈቀዱ VLANዎችን ይፈትሹ።",
        "የnative VLAN በሁለቱም የtrunk ጫፎች አንድ መሆኑን ያረጋግጡ።",
        "የራውተሩ sub-interface ላይ `encapsulation dot1Q` እና ትክክለኛ IP መኖሩን ይፈትሹ።"
      ]
    }
  },
  {
    "id": "ifdown",
    "p": "net",
    "title": {
      "en": "Interface down/down",
      "amh": "ኢንተርፌስ down/down"
    },
    "steps": {
      "en": [
        "Reseat the cable, or swap it for a known good one.",
        "Run `show interfaces status` and look for err-disabled ports.",
        "If err-disabled, fix the cause, then run `shutdown` and `no shutdown` on the port.",
        "Check that speed and duplex match on both ends."
      ],
      "amh": [
        "ገመዱን እንደገና ይሰኩ ወይም ጥሩ እንደሆነ በሚታወቅ ገመድ ይቀይሩ።",
        "`show interfaces status` ያሂዱ፤ err-disabled ፖርት ይፈልጉ።",
        "err-disabled ከሆነ ምክንያቱን አስተካክለው በፖርቱ ላይ `shutdown` እና `no shutdown` ያድርጉ።",
        "የspeed እና duplex ቅንብር በሁለቱም ጫፍ አንድ መሆኑን ያረጋግጡ።"
      ]
    }
  }
];
