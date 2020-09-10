'**************************************************************************
'*                            ADPCM Setup
'*            include file for Microsoft Multimedia Publishing
'**************************************************************************

DECLARE SUB CopyADPCMFiles
DECLARE SUB SetADPCMIniFiles

ADPCMFOROPENERS:
	'Make sure the startup for the main script is called INIT.
	GoTo INIT


SUB CopyADPCMFiles STATIC

	SrcDir$ = GetSymbolValue("STF_SRCDIR")
	SysDir$ = GetWindowsSysDir()

	AddSectionFilesToCopyList "System", SrcDir$, SysDir$

END SUB


SUB SetADPCMIniFiles STATIC

	WinDir$ = GetWindowsDir()

	If RunningNT() = 0 Then
		If GetIniKeyString( WinDir$ + "system.ini", "drivers", "WaveMapper" ) <> "msacm.drv" Then
			MUSTRESTART$ = "SWITCH"
		ElseIf GetIniKeyString( WinDir$ + "system.ini", "MSACM", "Install" ) <> "msadpcm.acm" Then
			MUSTRESTART$ = "SWITCH"
		End If

		CreateIniKeyValue WinDir$ + "system.ini", "drivers", "WaveMapper", "msacm.drv", cmoOverwrite
		CreateIniKeyValue WinDir$ + "system.ini", "MSACM", "Install", "msadpcm.acm", cmoOverwrite
	End If
	   	
END SUB
