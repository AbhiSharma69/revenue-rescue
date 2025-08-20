"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import Papa from "papaparse"
import { Button } from "@/components/ui/button"
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CSVData {
  schema: string[]
  rowCount: number
  sample: any[]
  fileName: string
}

interface FileUploadProps {
  onFileUpload: (data: CSVData) => void
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const processCSV = useCallback(
    (file: File) => {
      setIsProcessing(true)
      setError(null)
      setSuccess(false)

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            if (results.errors.length > 0) {
              throw new Error(`CSV parsing error: ${results.errors[0].message}`)
            }

            const data = results.data as any[]
            if (data.length === 0) {
              throw new Error("CSV file is empty")
            }

            const schema = Object.keys(data[0])
            const sample = data.slice(0, Math.min(5, data.length))

            const csvData: CSVData = {
              schema,
              rowCount: data.length,
              sample,
              fileName: file.name,
            }

            onFileUpload(csvData)
            setSuccess(true)

            // Reset success state after 3 seconds
            setTimeout(() => setSuccess(false), 3000)
          } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to process CSV file")
          } finally {
            setIsProcessing(false)
          }
        },
        error: (error) => {
          setError(`Failed to read file: ${error.message}`)
          setIsProcessing(false)
        },
      })
    },
    [onFileUpload],
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        processCSV(file)
      }
    },
    [processCSV],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".csv"],
    },
    maxFiles: 1,
    disabled: isProcessing,
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 group
          ${isDragActive ? "border-primary bg-primary/10 scale-[1.02] shadow-lg" : "border-border hover:border-primary/50 hover:bg-muted/25 hover:scale-[1.01]"}
          ${isProcessing ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"}
          ${success ? "border-green-500 bg-green-50 dark:bg-green-950/20" : ""}
        `}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center space-y-4">
          {isProcessing ? (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          ) : success ? (
            <CheckCircle className="h-12 w-12 text-green-500 animate-in zoom-in duration-500" />
          ) : (
            <Upload
              className={`h-12 w-12 text-muted-foreground transition-all duration-300 ${isDragActive ? "scale-110 text-primary" : "group-hover:scale-110 group-hover:text-primary"}`}
            />
          )}

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground transition-colors duration-300">
              {isProcessing ? "Processing CSV..." : success ? "File uploaded successfully!" : "Upload your CSV file"}
            </h3>
            <p className="text-muted-foreground transition-colors duration-300">
              {isDragActive
                ? "Drop your CSV file here..."
                : success
                  ? "Ready to analyze your data!"
                  : "Drag and drop a CSV file here, or click to select"}
            </p>
          </div>

          {!isProcessing && !success && (
            <Button
              variant="outline"
              className="mt-4 bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover:border-primary group-hover:text-primary"
            >
              <FileText className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
              Choose File
            </Button>
          )}
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="animate-in slide-in-from-top duration-300">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-500 text-green-700 dark:text-green-400 animate-in slide-in-from-bottom duration-300">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            CSV file processed successfully! You can now start asking questions about your data.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
