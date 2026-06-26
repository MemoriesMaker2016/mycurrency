"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DocumentUploadField from "./DocumentUploadField";
import { getOrderById, submitOrderDocuments } from "./orderDocuments";
import OrderSummaryCard, { OrderSummary } from "./OrderSummaryCard";

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const AADHAR_REGEX = /^\d{12}$/;

type FormErrors = Partial<
  Record<"panNumber" | "panFile" | "aadharNumber" | "aadharFront" | "aadharBack" | "selfie", string>
>;

export default function DocumentsCheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [panNumber, setPanNumber] = useState("");
  const [panFile, setPanFile] = useState<File | null>(null);
  const [aadharNumber, setAadharNumber] = useState("");
  const [aadharFront, setAadharFront] = useState<File | null>(null);
  const [aadharBack, setAadharBack] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!orderId) {
      setLoadError("No order found. Please start a new order first.");
      setLoadingOrder(false);
      return;
    }
    (async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (err) {
        console.error(err);
        setLoadError("Couldn't load your order. Please try again.");
      } finally {
        setLoadingOrder(false);
      }
    })();
  }, [orderId]);

  function validate() {
    const next: FormErrors = {};
    if (!PAN_REGEX.test(panNumber.toUpperCase())) next.panNumber = "Enter a valid PAN, e.g. ABCDE1234F";
    if (!panFile) next.panFile = "Upload your PAN card";
    if (!AADHAR_REGEX.test(aadharNumber)) next.aadharNumber = "Enter a valid 12-digit Aadhar number";
    if (!aadharFront) next.aadharFront = "Upload the front of your Aadhar card";
    if (!aadharBack) next.aadharBack = "Upload the back of your Aadhar card";
    if (!selfie) next.selfie = "Upload a selfie photo";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!orderId || !validate()) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const formData = new FormData();
      formData.append("panNumber", panNumber.toUpperCase());
      formData.append("aadharNumber", aadharNumber);
      formData.append("panCard", panFile as File);
      formData.append("aadharFront", aadharFront as File);
      formData.append("aadharBack", aadharBack as File);
      formData.append("selfie", selfie as File);

      await submitOrderDocuments(orderId, formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitError("Something went wrong while submitting your documents. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingOrder) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!loadError) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <AlertCircle className="mx-auto h-8 w-8 text-destructive" />
        <p className="mt-3 text-sm text-muted-foreground">{loadError}</p>
        <Button className="mt-4" onClick={() => router.push("/exchange")}>
          Back to Exchange
        </Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-green-600" />
        <h1 className="mt-4 text-xl font-semibold">Documents submitted</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ve received your documents. Our team will verify them and confirm your order shortly.
        </p>
        <Button className="mt-6" onClick={() => router.push("/profile")}>
          View My Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Verify your identity</h1>
        <p className="text-sm text-muted-foreground">
          We need a few documents to process this order, as required for forex transactions.
        </p>
      </div>

      {order && <OrderSummaryCard order={order} />}

      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border bg-card p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="panNumber">
              PAN number<span className="ml-0.5 text-destructive">*</span>
            </Label>
            <Input
              id="panNumber"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
              placeholder="ABCDE1234F"
              maxLength={10}
            />
            {errors.panNumber && <p className="text-xs text-destructive">{errors.panNumber}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="aadharNumber">
              Aadhar number<span className="ml-0.5 text-destructive">*</span>
            </Label>
            <Input
              id="aadharNumber"
              value={aadharNumber}
              onChange={(e) => setAadharNumber(e.target.value.replace(/\D/g, ""))}
              placeholder="123456789012"
              maxLength={12}
            />
            {errors.aadharNumber && <p className="text-xs text-destructive">{errors.aadharNumber}</p>}
          </div>
        </div>

        <DocumentUploadField
          id="panFile"
          label="PAN card"
          description="A clear photo or scan of your PAN card"
          accept="image/*,application/pdf"
          required
          file={panFile}
          onChange={setPanFile}
          error={errors.panFile}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <DocumentUploadField
            id="aadharFront"
            label="Aadhar card (front)"
            required
            file={aadharFront}
            onChange={setAadharFront}
            error={errors.aadharFront}
          />
          <DocumentUploadField
            id="aadharBack"
            label="Aadhar card (back)"
            required
            file={aadharBack}
            onChange={setAadharBack}
            error={errors.aadharBack}
          />
        </div>

        <DocumentUploadField
          id="selfie"
          label="Selfie photo"
          description="A clear photo of your face for identity verification"
          required
          file={selfie}
          onChange={setSelfie}
          error={errors.selfie}
          capturePhoto
        />

        {submitError && (
          <p className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" /> {submitError}
          </p>
        )}

        <Button type="submit" disabled={submitting} className="h-12 w-full text-base font-semibold">
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : (
            "Submit Documents"
          )}
        </Button>
      </form>
    </div>
  );
}
