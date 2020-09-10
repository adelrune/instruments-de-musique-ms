' mmperf.inc
' Microsoft Multimedia Publishing Group common system diagnostic
' routines for Setup scripts.
' Copyright (c) 1993 Microsoft Corporation.

' Development notes:
' This file should be #included into the main .mst file.
' The first routine in the main .mst file should be called INIT.
' The exit confirmation dialog routine should be called DIAG_QUIT.

' You can specify which problems force an exit by adding/removing
' comments from the lines in this file which read "GoTo DIAG_QUIT."

' The following values should be customized for the specific application:

' Begin customization
' ***********************************************

' CD-ROM performance test file.  This file needs to be > 1.5MB.
CONST TEST_PATH$ = "\msstp\mmperf.dat"


' ***********************************************
' End customization

Declare Sub GetSystemInfo   Lib "mscuistf.dll"
Declare Sub DoSysCheckNoWnd Lib "mscuistf.dll"

Declare Function RunningNT Lib "mscuistf.dll" As Integer
Declare Function SymbolDriveIsCD Lib "mscuistf.dll" As Integer


MMPERFFOROPENERS:
	' Note the opening routine in the main script needs to be called INIT.
	GoTo INIT


SYSCHECK:
	SetSymbolValue "testpath", TEST_PATH$

	SetSymbolValue "DIAG_RAM",    "OK"
	SetSymbolValue "DIAG_WINVER", "OK"
	SetSymbolValue "DIAG_AUDIO",  "OK"
	SetSymbolValue "DIAG_MIDI",   "OK"
	SetSymbolValue "DIAG_VIDEO",  "OK"
	SetSymbolValue "DIAG_CD",     "OK"

	sz$ = UIStartDlg( "mscuistf.dll", 170, "CheckingDlgProc", 0, "" )

	szPerfSrcDir$ = GetSymbolValue("STF_SRCDIR")
	szPerfDrive$  = Mid$(szPerfSrcDir$,1,1)

	SetSymbolValue "SymbolDrive", szPerfDrive$
	If SymbolDriveIsCD() <> 0 Then
		SetSymbolValue "testpath", szPerfDrive$ + ":" + TEST_PATH$
	Else
		SetSymbolValue "testpath", "NETWORK"
	End If

	GetSystemInfo
	DoSysCheckNoWnd

	UIPop 1


SYSCHECK_RAM:
	' Current RAM check fails under NT, so ignore result in this case.
	If RunningNT() = 0 Then
		If GetSymbolValue( "DIAG_RAM" ) = "ERROR" Then
			sz$ = UIStartDlg("mscuistf.dll", 2706, "FInfoDlgProc", 0, "")

			If sz$ = "REACTIVATE" THEN
				GoTo SYSCHECK_RAM
			End If
			UIPop 1
'			GoTo DIAG_QUIT
		End If
	End If
						   
SYSCHECK_WINVER:
	If GetSymbolValue( "DIAG_WINVER" ) = "ERROR" Then
		sz$ = UIStartDlg("mscuistf.dll", 2704, "FInfoDlgProc", 0, "")

		If sz$ = "REACTIVATE" THEN
			GoTo SYSCHECK_WINVER
		End If
		UIPop 1
	GoTo DIAG_QUIT
	End If
						   
SYSCHECK_AUDIO:
	If GetSymbolValue( "DIAG_AUDIO" ) = "ERROR" Then
		sz$ = UIStartDlg("mscuistf.dll", 2702, "FInfoDlgProc", 0, "")

		If sz$ = "REACTIVATE" THEN
			GoTo SYSCHECK_AUDIO
		End If
		UIPop 1
'		GoTo DIAG_QUIT
	End If
						   
'SYSCHECK_MIDI:
'	If GetSymbolValue( "DIAG_MIDI" ) = "ERROR" Then
'		sz$ = UIStartDlg("mscuistf.dll", 2703, "FInfoDlgProc", 0, "")
'
'		If sz$ = "REACTIVATE" THEN
'			GoTo SYSCHECK_MIDI
'		End If
'		UIPop 1
'		GoTo DIAG_QUIT
'	End If
						   
SYSCHECK_VIDEO:
	If GetSymbolValue( "DIAG_VIDEO" ) = "ERROR" Then
		sz$ = UIStartDlg("mscuistf.dll", 2707, "FInfoDlgProc", 0, "")

		If sz$ = "REACTIVATE" THEN
			GoTo SYSCHECK_VIDEO
		End If
		UIPop 1
		GoTo DIAG_QUIT
	End If
						   
'SYSCHECK_CDWARN:
'	If GetSymbolValue( "DIAG_CD" ) = "WARN" Then
'		sz$ = UIStartDlg("mscuistf.dll", 4705, "FInfoDlgProc", 0, "")
'
'		If sz$ = "REACTIVATE" THEN
'			GoTo SYSCHECK_CDWARN
'		End If
'		UIPop 1
'		GoTo DIAG_QUIT
'	End If
						   
SYSCHECK_CDERROR:
	If GetSymbolValue( "DIAG_CD" ) = "ERROR" Then
		sz$ = UIStartDlg("mscuistf.dll", 2705, "FInfoDlgProc", 0, "")

		If sz$ = "REACTIVATE" THEN
			GoTo SYSCHECK_CDERROR
		End If
		UIPop 1
'		GoTo DIAG_QUIT
	End If


RETURN
