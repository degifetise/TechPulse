// Command library. Add a command by adding one object to CMDS.
export const CATS = [
  {
    "id": "cmd",
    "name": "Windows CMD"
  },
  {
    "id": "ps",
    "name": "PowerShell"
  },
  {
    "id": "nix",
    "name": "Linux / macOS"
  },
  {
    "id": "ios",
    "name": "Cisco IOS"
  },
  {
    "id": "adb",
    "name": "Android ADB"
  }
];

export const CMDS = [
  {
    "c": "cmd",
    "x": "ipconfig /flushdns",
    "d": {
      "en": "Clear the DNS resolver cache.",
      "amh": "የDNS መሸጎጫን ያጽዳል።"
    }
  },
  {
    "c": "cmd",
    "x": "sfc /scannow",
    "d": {
      "en": "Scan and repair protected system files.",
      "amh": "የሲስተም ፋይሎችን ይፈትሻል፣ ይጠግናል።"
    }
  },
  {
    "c": "cmd",
    "x": "netstat -ano",
    "d": {
      "en": "List open connections with process IDs.",
      "amh": "ክፍት ግንኙነቶችን ከPID ጋር ያሳያል።"
    }
  },
  {
    "c": "cmd",
    "x": "tracert 8.8.8.8",
    "d": {
      "en": "Show every hop on the way to a destination.",
      "amh": "ወደ መድረሻ የሚያልፉ ጣቢያዎችን ሁሉ ያሳያል።"
    }
  },
  {
    "c": "ps",
    "x": "Get-Process | Sort CPU -Desc | Select -First 10",
    "d": {
      "en": "Top 10 processes by CPU time.",
      "amh": "ብዙ CPU የሚጠቀሙ 10 ፕሮግራሞች።"
    }
  },
  {
    "c": "ps",
    "x": "Test-NetConnection google.com -Port 443",
    "d": {
      "en": "Test whether a TCP port is reachable.",
      "amh": "የTCP ፖርት መድረስ መቻሉን ይፈትሻል።"
    }
  },
  {
    "c": "ps",
    "x": "Get-PhysicalDisk | Select FriendlyName, HealthStatus",
    "d": {
      "en": "Check the health of each physical disk.",
      "amh": "የእያንዳንዱን ዲስክ ጤና ይፈትሻል።"
    }
  },
  {
    "c": "ps",
    "x": "Get-WinEvent -LogName System -MaxEvents 20",
    "d": {
      "en": "Read the 20 latest system log events.",
      "amh": "የቅርብ ጊዜ 20 የሲስተም ምዝግብ ክስተቶችን ያነባል።"
    }
  },
  {
    "c": "nix",
    "x": "df -h",
    "d": {
      "en": "Show disk space in readable sizes.",
      "amh": "የዲስክ ቦታን በሚነበብ መጠን ያሳያል።"
    }
  },
  {
    "c": "nix",
    "x": "sudo lsof -i :80",
    "d": {
      "en": "Find which process is using port 80.",
      "amh": "ፖርት 80 የሚጠቀመውን ፕሮግራም ያገኛል።"
    }
  },
  {
    "c": "nix",
    "x": "dig +short example.com",
    "d": {
      "en": "Quick DNS lookup.",
      "amh": "ፈጣን የDNS ፍለጋ።"
    }
  },
  {
    "c": "nix",
    "x": "sudo dscacheutil -flushcache",
    "d": {
      "en": "Flush the DNS cache on macOS.",
      "amh": "በmacOS ላይ የDNS መሸጎጫን ያጽዳል።"
    }
  },
  {
    "c": "ios",
    "x": "show ip interface brief",
    "d": {
      "en": "Status and IP address of every interface.",
      "amh": "የሁሉም ኢንተርፌስ ሁኔታና IP አድራሻ።"
    }
  },
  {
    "c": "ios",
    "x": "show running-config",
    "d": {
      "en": "Display the active configuration.",
      "amh": "አሁን የሚሰራውን ውቅር ያሳያል።"
    }
  },
  {
    "c": "ios",
    "x": "show vlan brief",
    "d": {
      "en": "List VLANs and the ports in each.",
      "amh": "VLANዎችንና በእያንዳንዱ ውስጥ ያሉ ፖርቶችን ይዘረዝራል።"
    }
  },
  {
    "c": "ios",
    "x": "copy running-config startup-config",
    "d": {
      "en": "Save the configuration so it survives a reboot.",
      "amh": "ውቅሩ ዳግም ሲነሳ እንዳይጠፋ ያስቀምጣል።"
    }
  },
  {
    "c": "adb",
    "x": "adb devices",
    "d": {
      "en": "List connected Android devices.",
      "amh": "የተገናኙ አንድሮይድ መሣሪያዎችን ይዘረዝራል።"
    }
  },
  {
    "c": "adb",
    "x": "adb reboot recovery",
    "d": {
      "en": "Reboot the phone into recovery mode.",
      "amh": "ስልኩን ወደ Recovery mode ያስነሳል።"
    }
  },
  {
    "c": "adb",
    "x": "adb logcat -d > log.txt",
    "d": {
      "en": "Save the device log to a file.",
      "amh": "የመሣሪያውን ምዝግብ ወደ ፋይል ያስቀምጣል።"
    }
  },
  {
    "c": "adb",
    "x": "adb shell dumpsys battery",
    "d": {
      "en": "Show battery level, status and health.",
      "amh": "የባትሪ ደረጃ፣ ሁኔታና ጤና ያሳያል።"
    }
  }
];
