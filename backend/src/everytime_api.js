const { listIndexes } = require("./mongo_student")

Private Sub WebBrowser1_DocumentCompleted(sender As Object, e As WebBrowserDocumentCompletedEventArgs) __
    Handles WebBrowser1.DocumentCompleted
    source = WebBrowser1.Document.Body.InnerHtml
    
    If source.Contains("<div class =""tablebody"">") Then
        WebBrowser1.Visible = false
        WebBrowser1.Dock = DockStyle.None
        WebBrowser1.Width = 1920
        TableChecker.Start()
    End If

End Sub

Private Sub TableChecker_Tick(sender As Object, e As EventArgs) Handles TableChecker.Tick
    Dim source As String = WebBrowser1.Document.Body.InnerHtml
    Dim tabledata As String = ""

    If source.Contains("class=""subject") Then

        TableChecker.Stop()

        Dim day As Integer = 0

        Dim tables As listIndexes(Of String) = mutipleMidReturn("<div class=""cols"", "<div calss""grids"">", source)

        For Each table As String In tables
            If s.Contains("<div") Then
                Dim courses As listIndexes(Of String) = mutipleMidReturn("<div", "</div>", s)

                For Each course As String In courses
                    Dim name As String = midReturn("<h3>", "</h3>", c)
                    Dim start As Integer = Convert.ToInt16(midReturn("top:", ";", c).Replace("px", ""))
                    Dim len As Integer = Convert.ToInt16(midReturn("height:", ";", c).Replace("px", ""))
                    Dim prof As String = getData(c, "em")
                    Dim memo As String = getData(c, "span")
                    Dim color As New Color

                Select Case midReturn("subject color", """, c)
                    Case "1"
                        color = Color.FromArgb(240,134,118)
                    Case "2"
                        color = Color.FromArgb(251,171,102)
                    Case "9"
                        color = Color.FromArgb(159,134,225)
                    Case Else
                        color = Color.DarkGray
                    End Select

                    tabledata += "<course>" + vbCrLf
                    tabledata += vbTab + "<day>" + day.ToString + "</day>" + vbCrLf
                    tabledata += vbTab + "<name>" + name + "</name>" + vbCrLf
                    tabledata += vbTab + "<prof>" + prof + "</prof>" + vbCrLf
                    tabledata += vbTab + "<memo>" + memo + "</memo>" + vbCrLf
                    tabledata += vbTab + "<start>" + start.ToString + "</start>" + vbCrLf
                    tabledata += vbTab + "<end>" + (start + len).ToString + "</end>" + vbCrLf
                    tabledata += vbTab + "<color>" + colorTranslator.ToHtml(color) + "</color>" + vbCrLf
                    tabledata += "</course>" + vbCrLf
                Next
            End If

            day += 1

            If day > 4 Then
                Exit For
            End If
        Next

        If MsgBox(" 수강신청 정보를 불러오시겠습니까?", MsgBoxStyle.YesNo) = MsgBoxResult.Yes Then
            writeTable("<tablename>")