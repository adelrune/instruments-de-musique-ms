'*************************************************************************
'**
'** IsVersionLater
'** --------
'** Purpose:
'**     Compares two file versions
'** Arguments:
'**     VerOld$ - Old file version string (in format N.N.N.N)
'**     VerNew$ - New file version string (in format N.N.N.N)
'** Returns:
'**     1 if new version is later, 0 if new version is older or the same
'*************************************************************************
FUNCTION IsVersionLater (VerOld$, VerNew$) STATIC AS INTEGER

	FOR I=1 TO 4 

		VOld = GetVersionNthField (VerOld$, I)
		VNew = GetVersionNthField (VerNew$, I)

		

		If VNew > VOld THEN 
			IsVersionLater = 1

			GOTO XFUNC1	
		ElseIf VNew < VOld Then
			IsVersionLater = 0

			GOTO XFUNC1
		End If


	NEXT I
	IsVersionLater = 0		

XFUNC1:
	
END FUNCTION


'*************************************************************************
'**
'** IsDateLater
'** --------
'** Purpose:
'**     Compares two file dates
'** Arguments:
'**     DateOld$ in YYYY-MM-DD-HH-MM-SS format
'**     DateNew$ in YYYY-MM-DD-HH-MM-SS format
'** Returns:
'**     1 if new date is later, 0 if new date is older or the same
'*************************************************************************
FUNCTION IsDateLater (DateOld$, DateNew$) STATIC AS INTEGER
	

	'First compare year

	OldYear% = GetYearFromDate (DateOld$)
	NewYear% = GetYearFromDate (DateNew$)

	If NewYear% < OldYear% Then
		IsDateLater = 0

	ElseIf NewYear% = OldYear% Then

		'If year is the same, compare month
		
		OldMonth% = GetMonthFromDate (DateOld$)
		NewMonth% = GetMonthFromDate (DateNew$)

		If NewMonth% < OldMonth% Then
			IsDateLater = 0

		ElseIf NewMonth% = OldMonth% Then

			'If month is the same, compare day

			OldDay% = GetDayFromDate (DateOld$)
			NewDay% = GetDayFromDate (DateNew$)

			If NewDay% <= OldDay% Then
				IsDateLater = 0
			Else
				IsDateLater = 1
			End If
		 
		Else
			IsDateLater = 1
		End If

	Else
		IsDateLater = 1
	ENDIF
	
END FUNCTION





